const state = {
  appData: null,
  selectedCourseId: '',
  selectedMonth: '',
  todayCopyText: ''
};

const weekdayLabels = ['日', '月', '火', '水', '木', '金', '土'];
const panes = {
  calendar: document.getElementById('calendarTab'),
  mine: document.getElementById('mineTab'),
  today: document.getElementById('todayTab')
};

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

document.getElementById('prevMonth').addEventListener('click', () => moveMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => moveMonth(1));
document.getElementById('submitAttendance').addEventListener('click', submitAttendance);
document.getElementById('participantSelect').addEventListener('change', updateSelectedParticipantName);
document.getElementById('mineParticipantSelect').addEventListener('change', loadMyResponses);
document.getElementById('copyToday').addEventListener('click', copyTodaySummary);
document.getElementById('setupSheets').addEventListener('click', runSetupSheets);
document.getElementById('seedSample').addEventListener('click', runSeedSample);

bootApp();

async function bootApp() {
  try {
    const data = await apiGet('appData');
    boot(data);
  } catch (error) {
    showError(error);
  }
}

function boot(data) {
  state.appData = data;
  state.selectedMonth = data.currentMonth;
  document.getElementById('appTitle').textContent = data.title;
  fillParticipantSelects(data.participants);
  renderCalendar();
  renderTodayPanel();
  document.getElementById('loading').classList.add('hidden');
  switchTab('calendar');

  const initialCourse = data.todayCourse || data.upcomingCourse || data.courses[0];
  if (initialCourse) {
    selectCourse(initialCourse.id);
  }
  document.getElementById('participantSelect').value = '';
  if (data.participants[0]) {
    document.getElementById('mineParticipantSelect').value = data.participants[0].id;
    loadMyResponses();
  }
}

function showError(error) {
  const loading = document.getElementById('loading');
  loading.classList.remove('hidden');
  loading.textContent = error.message || 'データの読み込みに失敗しました。';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });

  Object.keys(panes).forEach((key) => {
    panes[key].classList.toggle('hidden', key !== tabName);
  });

  if (tabName === 'mine') {
    loadMyResponses();
  }

  if (tabName === 'today') {
    renderTodayPanel();
  }
}

function fillParticipantSelects(participants) {
  const selects = [
    document.getElementById('participantSelect'),
    document.getElementById('mineParticipantSelect')
  ];

  selects.forEach((select) => {
    if (!participants.length) {
      select.innerHTML = '<option value="">参加者が未登録です</option>';
      select.disabled = true;
      return;
    }

    select.disabled = false;
    const placeholder = select.id === 'participantSelect'
      ? '<option value="">お名前を選択してください</option>'
      : '';
    select.innerHTML = placeholder + participants.map((participant) => (
      '<option value="' + participant.id + '">' + escapeHtml(participant.name) + '</option>'
    )).join('');
  });

  updateSelectedParticipantName();
}

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const monthTitle = document.getElementById('monthTitle');
  const [year, month] = state.selectedMonth.split('-').map(Number);
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  const startIndex = firstDate.getDay();
  const totalCells = Math.ceil((startIndex + lastDate.getDate()) / 7) * 7;
  const todayIso = state.appData.todayIso;

  monthTitle.textContent = year + '年' + month + '月';
  grid.innerHTML = weekdayLabels.map((label) => (
    '<div class="weekday">' + label + '</div>'
  )).join('');

  const coursesByDate = state.appData.courses.reduce((acc, course) => {
    acc[course.date] = acc[course.date] || [];
    acc[course.date].push(course);
    return acc;
  }, {});

  for (let index = 0; index < totalCells; index += 1) {
    const dayNumber = index - startIndex + 1;
    const date = new Date(year, month - 1, dayNumber);
    const inMonth = dayNumber > 0 && dayNumber <= lastDate.getDate();
    const isoDate = formatIsoDate(date);
    const dayCourses = inMonth ? (coursesByDate[isoDate] || []) : [];

    const cell = document.createElement('div');
    cell.className = 'day-cell' + (inMonth ? '' : ' muted') + (isoDate === todayIso ? ' today' : '');
    cell.innerHTML = '<div class="day-number">' + (inMonth ? date.getDate() : '') + '</div>';

    dayCourses.forEach((course) => {
      const button = document.createElement('button');
      button.className = 'course-chip';
      button.innerHTML = '<strong>' + escapeHtml(course.title) + '</strong>';
      button.addEventListener('click', () => selectCourse(course.id));
      cell.appendChild(button);
    });

    grid.appendChild(cell);
  }
}

async function selectCourse(courseId) {
  state.selectedCourseId = courseId;
  try {
    const course = await apiGet('courseDetail', { courseId });
    renderCourseDetail(course);
  } catch (error) {
    setMessage('submitMessage', error.message || '講座詳細の取得に失敗しました。');
  }
}

function renderCourseDetail(course) {
  document.getElementById('detailEmpty').classList.add('hidden');
  document.getElementById('detailView').classList.remove('hidden');
  document.getElementById('detailTitle').textContent = course.title;
  document.getElementById('detailBadges').innerHTML = [
    '<span class="badge">' + escapeHtml(course.acceptanceStatus) + '</span>',
    course.isPast ? '<span class="badge red">開催済み</span>' : '',
    course.isToday ? '<span class="badge green">本日開催</span>' : ''
  ].join('');
  document.getElementById('detailMeta').innerHTML = [
    metaBox('日時', course.dateLabel + ' ' + course.timeLabel),
    metaBox('講師', course.teacher || '未設定'),
    metaBox('開催方法', course.method || '未設定'),
    metaBox('URL', course.detailUrl ? '<a href="' + escapeHtml(course.detailUrl) + '" target="_blank" rel="noreferrer">講座URLを開く</a>' : '未設定')
  ].join('');
  document.getElementById('detailStats').innerHTML = [
    statCard('出席', course.attendeeCount + '名'),
    statCard('欠席', course.absenteeCount + '名'),
    statCard('未定', course.pendingCount + '名'),
    statCard('未回答', course.unansweredCount + '名')
  ].join('');

  const listBlocks = [];
  if (state.appData.showParticipantNames) {
    listBlocks.push(renderNameBlock('出席予定', course.attendees));
    listBlocks.push(renderNameBlock('欠席予定', course.absentees));
    listBlocks.push(renderNameBlock('未定', course.pendingParticipants));
    listBlocks.push(renderNameBlock('未回答', course.unansweredParticipants));
  } else {
    listBlocks.push('<p class="hint">参加者名の一覧は非公開設定です。人数のみ表示しています。</p>');
  }
  document.getElementById('detailLists').innerHTML = listBlocks.join('');

  renderStatusRadios();
  updateSelectedParticipantName();
}

function renderStatusRadios() {
  const container = document.getElementById('statusRadios');
  container.innerHTML = state.appData.statuses.map((status, index) => (
    '<label class="radio-card"><input type="radio" name="attendanceStatus" value="' +
    escapeHtml(status) + '" ' + (index === 0 ? 'checked' : '') + ' />' +
    escapeHtml(status) + '</label>'
  )).join('');
}

async function submitAttendance() {
  const participantId = document.getElementById('participantSelect').value;
  const statusNode = document.querySelector('input[name="attendanceStatus"]:checked');

  if (!participantId) {
    setMessage('submitMessage', 'お名前を選択してください。');
    return;
  }

  try {
    const result = await apiPost('submitAttendance', {
      courseId: state.selectedCourseId,
      participantId,
      status: statusNode ? statusNode.value : ''
    });
    setMessage('submitMessage', result.message);
    state.appData.courses = state.appData.courses.map((course) => (
      course.id === result.course.id ? result.course : course
    ));
    renderCalendar();
    renderCourseDetail(result.course);
    renderTodayPanel();
    loadMyResponses();
  } catch (error) {
    setMessage('submitMessage', error.message || '登録に失敗しました。');
  }
}

async function loadMyResponses() {
  const participantId = document.getElementById('mineParticipantSelect').value;
  if (!participantId) return;

  try {
    const result = await apiGet('myResponses', { participantId });
    document.getElementById('myResponses').innerHTML = result.responses.map((item) => (
      '<div class="response-item">' +
      '<strong>' + escapeHtml(item.courseTitle) + '</strong>' +
      '<div>' + escapeHtml(item.dateLabel + ' ' + item.timeLabel) + '</div>' +
      '<div class="badge-row" style="margin-top:10px;">' +
      responseBadge(item.status) +
      (item.updatedAt ? '<span class="badge">更新 ' + escapeHtml(item.updatedAt) + '</span>' : '') +
      '</div>' +
      '</div>'
    )).join('');
  } catch (error) {
    document.getElementById('myResponses').innerHTML = '<p class="empty">' + escapeHtml(error.message || '取得に失敗しました。') + '</p>';
  }
}

async function renderTodayPanel() {
  try {
    const result = await apiGet('todayDashboard');
    state.todayCopyText = result.copyText || '';
    const course = result.todayCourse || result.upcomingCourse;
    const title = result.todayCourse ? '本日の講座' : '次回講座';
    const container = document.getElementById('todayCard');

    if (!course) {
      container.innerHTML = '<p class="empty">表示できる講座がありません。</p>';
      return;
    }

    container.innerHTML = [
      '<div class="badge-row" style="margin-bottom:14px;">',
      '<span class="badge">' + title + '</span>',
      '<span class="badge green">参加予定 ' + course.attendeeCount + '名</span>',
      '<span class="badge red">欠席 ' + course.absenteeCount + '名</span>',
      '<span class="badge orange">未回答 ' + course.unansweredCount + '名</span>',
      '</div>',
      '<h3 style="margin:0 0 8px;">' + escapeHtml(course.title) + '</h3>',
      '<p class="hint" style="margin-top:0;">' + escapeHtml(course.dateLabel + ' ' + course.timeLabel) + '</p>',
      renderNameBlock('参加予定者', course.attendees),
      renderNameBlock('未回答者', course.unansweredParticipants)
    ].join('');
  } catch (error) {
    document.getElementById('todayCard').innerHTML = '<p class="empty">' + escapeHtml(error.message || '表示に失敗しました。') + '</p>';
  }
}

function copyTodaySummary() {
  if (!state.todayCopyText) {
    setMessage('setupMessage', 'コピーできる講座情報がありません。');
    return;
  }

  navigator.clipboard.writeText(state.todayCopyText)
    .then(() => setMessage('setupMessage', '参加者一覧をコピーしました。'))
    .catch(() => setMessage('setupMessage', 'コピーに失敗しました。'));
}

async function runSetupSheets() {
  try {
    const result = await apiPost('setupSheets');
    setMessage('setupMessage', result.message);
  } catch (error) {
    setMessage('setupMessage', error.message || 'シート準備に失敗しました。');
  }
}

async function runSeedSample() {
  try {
    const result = await apiPost('seedSampleData');
    setMessage('setupMessage', result.message);
    const data = await apiGet('appData');
    boot(data);
  } catch (error) {
    setMessage('setupMessage', error.message || 'サンプル投入に失敗しました。');
  }
}

function moveMonth(diff) {
  const [year, month] = state.selectedMonth.split('-').map(Number);
  const nextDate = new Date(year, month - 1 + diff, 1);
  state.selectedMonth = nextDate.getFullYear() + '-' + String(nextDate.getMonth() + 1).padStart(2, '0');
  renderCalendar();
}

function renderNameBlock(label, names) {
  return [
    '<div class="list-block">',
    '<h4>' + escapeHtml(label) + ' ' + (names ? names.length : 0) + '名</h4>',
    names && names.length
      ? '<div class="name-list">' + names.map((name) => '<span>' + escapeHtml(name) + '</span>').join('') + '</div>'
      : '<p class="hint">なし</p>',
    '</div>'
  ].join('');
}

function statCard(label, value) {
  return '<div class="stat-card"><div class="hint">' + escapeHtml(label) + '</div><strong>' + escapeHtml(value) + '</strong></div>';
}

function metaBox(label, value) {
  return '<div><div class="hint">' + escapeHtml(label) + '</div><strong>' + value + '</strong></div>';
}

function responseBadge(status) {
  if (status === '出席') return '<span class="badge green">出席</span>';
  if (status === '欠席') return '<span class="badge red">欠席</span>';
  if (status === '未定') return '<span class="badge orange">未定</span>';
  return '<span class="badge">未回答</span>';
}

function setMessage(id, text) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.remove('hidden');
}

function updateSelectedParticipantName() {
  const participantId = document.getElementById('participantSelect').value;
  const participant = state.appData && state.appData.participants
    ? state.appData.participants.find((item) => item.id === participantId)
    : null;
  const box = document.getElementById('selectedParticipantName');

  if (!participant) {
    box.textContent = '';
    box.classList.add('hidden');
    return;
  }

  box.textContent = '選択中: ' + participant.name;
  box.classList.remove('hidden');
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function apiGet(action, params = {}) {
  const search = new URLSearchParams({ action, ...params });
  const response = await fetch('/api/gas?' + search.toString());
  const payload = await response.json();
  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'API エラーが発生しました。');
  }
  return payload.data;
}

async function apiPost(action, payload = {}) {
  const response = await fetch('/api/gas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action, payload })
  });
  const result = await response.json();
  if (!response.ok || !result.ok) {
    throw new Error(result.message || 'API エラーが発生しました。');
  }
  return result.data;
}
