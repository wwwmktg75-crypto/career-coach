const CONFIG = {
  APP_TITLE: 'AI SUMMER SCHOOL 2026 出席カレンダー',
  TIMEZONE: 'Asia/Tokyo',
  SPREADSHEET_ID: '',
  DEFAULT_START_TIME: '20:00',
  DEFAULT_END_TIME: '21:30',
  SHEETS: {
    COURSES: '講座一覧',
    PARTICIPANTS: '参加者',
    RESPONSES: '出欠回答'
  },
  HEADERS: {
    COURSES: [
      '講座ID',
      '開催日',
      '開始時刻',
      '終了時刻',
      '講座名',
      '講師名',
      '開催方法',
      '詳細URL',
      '受付状況',
      '公開状態',
      '備考'
    ],
    PARTICIPANTS: [
      '参加者ID',
      '名前',
      'メール',
      'Discord名',
      '利用状態',
      '確認番号'
    ],
    RESPONSES: [
      '講座ID',
      '参加者ID',
      '名前',
      '回答',
      '回答日時',
      '更新日時'
    ]
  },
  STATUS_OPTIONS: ['出席', '欠席', '未定'],
  SHOW_PARTICIPANT_NAMES: true,
  REQUIRE_PIN_IF_PRESENT: false
};

function doGet(e) {
  if (isApiRequest_(e)) {
    return handleApiGet_(e);
  }

  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle(CONFIG.APP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getAppData() {
  ensureSheets_();

  const courses = loadCourses_();
  const participants = loadParticipants_();
  const responseMap = loadResponseMap_();
  const activeParticipants = participants.filter(function(participant) {
    return participant.isActive;
  });
  const courseSummaries = courses.map(function(course) {
    return buildCourseSummary_(course, activeParticipants, responseMap);
  });
  const initialCourse = findTodayCourse_(courseSummaries) ||
    findUpcomingCourse_(courseSummaries) ||
    courseSummaries[0] ||
    null;

  return {
    title: CONFIG.APP_TITLE,
    timezone: CONFIG.TIMEZONE,
    statuses: CONFIG.STATUS_OPTIONS.slice(),
    showParticipantNames: CONFIG.SHOW_PARTICIPANT_NAMES,
    todayIso: formatDateKey_(new Date()),
    currentMonth: initialCourse ? initialCourse.date.slice(0, 7) : Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM'),
    courses: courseSummaries,
    participants: activeParticipants.map(toPublicParticipant_),
    todayCourse: findTodayCourse_(courseSummaries),
    upcomingCourse: findUpcomingCourse_(courseSummaries)
  };
}

function getCourseDetail(courseId) {
  ensureSheets_();

  const course = findCourseById_(courseId);
  if (!course) {
    throw new Error('講座が見つかりません。');
  }

  const participants = loadParticipants_().filter(function(participant) {
    return participant.isActive;
  });
  const responseMap = loadResponseMap_();
  return buildCourseSummary_(course, participants, responseMap);
}

function getMyResponses(participantId) {
  ensureSheets_();

  const participants = loadParticipants_();
  const participant = participants.find(function(item) {
    return item.id === participantId && item.isActive;
  });

  if (!participant) {
    throw new Error('参加者が見つかりません。');
  }

  const courses = loadCourses_();
  const responseMap = loadResponseMap_();
  const rows = courses.map(function(course) {
    const key = buildResponseKey_(course.id, participantId);
    const response = responseMap[key] || null;

    return {
      courseId: course.id,
      courseTitle: course.title,
      dateLabel: formatCourseDateLabel_(course),
      timeLabel: buildTimeLabel_(course.startTime, course.endTime),
      teacher: course.teacher,
      status: response ? response.status : '未回答',
      updatedAt: response ? response.updatedAt : '',
      isPast: course.isPast
    };
  });

  return {
    participant: toPublicParticipant_(participant),
    responses: rows
  };
}

function submitAttendance(input) {
  ensureSheets_();

  const payload = input || {};
  const courseId = String(payload.courseId || '').trim();
  const participantId = String(payload.participantId || '').trim();
  const status = String(payload.status || '').trim();

  if (!courseId || !participantId || !status) {
    throw new Error('講座・参加者・回答をすべて選択してください。');
  }

  if (CONFIG.STATUS_OPTIONS.indexOf(status) === -1) {
    throw new Error('不正な回答です。');
  }

  const course = findCourseById_(courseId);
  if (!course) {
    throw new Error('講座が見つかりません。');
  }

  const participants = loadParticipants_();
  const participant = participants.find(function(item) {
    return item.id === participantId && item.isActive;
  });
  if (!participant) {
    throw new Error('参加者が見つかりません。');
  }

  const sheet = getSheet_(CONFIG.SHEETS.RESPONSES, CONFIG.HEADERS.RESPONSES);
  const timestamp = Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    'yyyy/MM/dd HH:mm:ss'
  );
  const existing = findExistingResponseRow_(sheet, courseId, participantId);

  if (existing) {
    sheet.getRange(existing.rowNumber, 3, 1, 4).setValues([[
      participant.name,
      status,
      existing.firstAnsweredAt || timestamp,
      timestamp
    ]]);
  } else {
    sheet.appendRow([
      courseId,
      participantId,
      participant.name,
      status,
      timestamp,
      timestamp
    ]);
  }

  const detail = getCourseDetail(courseId);
  return {
    ok: true,
    message: participant.name + 'さんの回答を「' + status + '」で登録しました。',
    course: detail
  };
}

function getTodayDashboard() {
  ensureSheets_();

  const appData = getAppData();
  return {
    todayIso: appData.todayIso,
    todayCourse: appData.todayCourse,
    upcomingCourse: appData.upcomingCourse,
    copyText: buildDashboardCopyText_(
      appData.todayCourse || appData.upcomingCourse
    )
  };
}

function doPost(e) {
  if (isApiRequest_(e)) {
    return handleApiPost_(e);
  }

  return createJsonResponse_({
    ok: false,
    message: 'API リクエストではありません。'
  });
}

function setupSheets() {
  ensureSheets_();
  return {
    ok: true,
    message: '必要なシートを準備しました。'
  };
}

function seedSampleData() {
  ensureSheets_();

  const courseSheet = getSheet_(CONFIG.SHEETS.COURSES, CONFIG.HEADERS.COURSES);
  const participantSheet = getSheet_(
    CONFIG.SHEETS.PARTICIPANTS,
    CONFIG.HEADERS.PARTICIPANTS
  );
  const responseSheet = getSheet_(
    CONFIG.SHEETS.RESPONSES,
    CONFIG.HEADERS.RESPONSES
  );

  clearDataRows_(courseSheet);
  clearDataRows_(participantSheet);
  clearDataRows_(responseSheet);

  courseSheet.getRange(2, 1, 4, CONFIG.HEADERS.COURSES.length).setValues([
    ['SS001', '2026/08/09', '20:00', '21:30', 'Day1 LLM使い分け講座', '大川さん', 'オンライン', 'https://example.com/ss001', '受付中', '公開', ''],
    ['SS002', '2026/08/12', '20:00', '21:30', 'Day2 NotebookLM実践講座', '佐々木さん', 'オンライン', 'https://example.com/ss002', '受付中', '公開', ''],
    ['SS003', '2026/08/19', '20:00', '21:30', 'Day3 AIエージェント入門', 'AIちゃん', 'オンライン', 'https://example.com/ss003', '受付中', '公開', ''],
    ['SS004', '2026/08/26', '20:00', '21:30', 'Day4 実務自動化ワーク', 'ソフィーさん', 'オンライン', 'https://example.com/ss004', '受付中', '公開', '']
  ]);

  participantSheet.getRange(2, 1, 8, CONFIG.HEADERS.PARTICIPANTS.length).setValues([
    ['U001', 'AIちゃん', '', 'AI-chan', '有効', '1234'],
    ['U002', 'ソフィー', '', 'sophy', '有効', '2345'],
    ['U003', 'マッキー', '', 'makky', '有効', '3456'],
    ['U004', 'カズコ', '', 'kazuko', '有効', '4567'],
    ['U005', '大川', '', 'okawa', '有効', '5678'],
    ['U006', '砂ニャンコ', '', 'sunanyanko', '有効', '6789'],
    ['U007', '未回答さん', '', 'mihenkai', '有効', ''],
    ['U008', 'お休み予定さん', '', 'oyasumi', '有効', '']
  ]);

  responseSheet.getRange(2, 1, 9, CONFIG.HEADERS.RESPONSES.length).setValues([
    ['SS001', 'U001', 'AIちゃん', '出席', '2026/08/04 09:10:00', '2026/08/04 09:10:00'],
    ['SS001', 'U002', 'ソフィー', '出席', '2026/08/04 09:11:00', '2026/08/04 09:11:00'],
    ['SS001', 'U003', 'マッキー', '出席', '2026/08/04 09:12:00', '2026/08/04 09:12:00'],
    ['SS001', 'U004', 'カズコ', '出席', '2026/08/04 09:13:00', '2026/08/04 09:13:00'],
    ['SS001', 'U005', '大川', '欠席', '2026/08/04 09:14:00', '2026/08/04 09:14:00'],
    ['SS001', 'U006', '砂ニャンコ', '未定', '2026/08/04 09:15:00', '2026/08/04 09:15:00'],
    ['SS002', 'U001', 'AIちゃん', '出席', '2026/08/04 09:20:00', '2026/08/04 09:20:00'],
    ['SS002', 'U002', 'ソフィー', '欠席', '2026/08/04 09:21:00', '2026/08/04 09:21:00'],
    ['SS002', 'U003', 'マッキー', '出席', '2026/08/04 09:22:00', '2026/08/04 09:22:00']
  ]);

  return {
    ok: true,
    message: 'サンプルデータを投入しました。'
  };
}

function ensureSheets_() {
  getSheet_(CONFIG.SHEETS.COURSES, CONFIG.HEADERS.COURSES);
  getSheet_(CONFIG.SHEETS.PARTICIPANTS, CONFIG.HEADERS.PARTICIPANTS);
  getSheet_(CONFIG.SHEETS.RESPONSES, CONFIG.HEADERS.RESPONSES);
}

function isApiRequest_(e) {
  const params = e && e.parameter ? e.parameter : {};
  return String(params.api || '') === '1';
}

function handleApiGet_(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const action = String(params.action || '').trim();

    if (action === 'appData') {
      return createJsonResponse_({ ok: true, data: getAppData() });
    }

    if (action === 'courseDetail') {
      return createJsonResponse_({
        ok: true,
        data: getCourseDetail(params.courseId)
      });
    }

    if (action === 'myResponses') {
      return createJsonResponse_({
        ok: true,
        data: getMyResponses(params.participantId)
      });
    }

    if (action === 'todayDashboard') {
      return createJsonResponse_({
        ok: true,
        data: getTodayDashboard()
      });
    }

    return createJsonResponse_({
      ok: false,
      message: '未対応の action です。'
    });
  } catch (error) {
    return createJsonResponse_({
      ok: false,
      message: error.message || '取得に失敗しました。'
    });
  }
}

function handleApiPost_(e) {
  try {
    const body = parseJsonBody_(e);
    const action = String(body.action || '').trim();
    const payload = body.payload || {};

    if (action === 'submitAttendance') {
      return createJsonResponse_({
        ok: true,
        data: submitAttendance(payload)
      });
    }

    if (action === 'setupSheets') {
      return createJsonResponse_({
        ok: true,
        data: setupSheets()
      });
    }

    if (action === 'seedSampleData') {
      return createJsonResponse_({
        ok: true,
        data: seedSampleData()
      });
    }

    return createJsonResponse_({
      ok: false,
      message: '未対応の action です。'
    });
  } catch (error) {
    return createJsonResponse_({
      ok: false,
      message: error.message || '更新に失敗しました。'
    });
  }
}

function parseJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  return JSON.parse(e.postData.contents);
}

function getSpreadsheet_() {
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_(sheetName, headers) {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const currentHeaders = headerRange.getValues()[0];
  const needsReset = headers.some(function(header, index) {
    return currentHeaders[index] !== header;
  });

  if (needsReset) {
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#0d2f66');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

function clearDataRows_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }
}

function loadCourses_() {
  const sheet = getSheet_(CONFIG.SHEETS.COURSES, CONFIG.HEADERS.COURSES);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.COURSES.length).getValues();
  return rows
    .filter(function(row) {
      return row[0] && row[1] && row[2] && String(row[9] || '公開') !== '非公開';
    })
    .map(function(row) {
      const dateKey = normalizeSheetDate_(row[1]);
      return {
        id: String(row[0]),
        date: dateKey,
        startTime: normalizeTime_(row[2], CONFIG.DEFAULT_START_TIME),
        endTime: normalizeTime_(row[3], CONFIG.DEFAULT_END_TIME),
        title: String(row[4] || ''),
        teacher: String(row[5] || ''),
        method: String(row[6] || ''),
        detailUrl: String(row[7] || ''),
        acceptanceStatus: String(row[8] || '受付中'),
        note: String(row[10] || '')
      };
    })
    .sort(compareCourses_);
}

function loadParticipants_() {
  const sheet = getSheet_(CONFIG.SHEETS.PARTICIPANTS, CONFIG.HEADERS.PARTICIPANTS);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.PARTICIPANTS.length).getValues();
  return rows
    .filter(function(row) {
      return row[0] && row[1];
    })
    .map(function(row) {
      return {
        id: String(row[0]),
        name: String(row[1]),
        email: String(row[2] || ''),
        discordName: String(row[3] || ''),
        state: String(row[4] || '有効'),
        pin: String(row[5] || ''),
        isActive: String(row[4] || '有効') !== '無効'
      };
    })
    .sort(function(a, b) {
      return a.name.localeCompare(b.name, 'ja');
    });
}

function loadResponseMap_() {
  const sheet = getSheet_(CONFIG.SHEETS.RESPONSES, CONFIG.HEADERS.RESPONSES);
  const lastRow = sheet.getLastRow();
  const map = {};
  if (lastRow < 2) return map;

  const rows = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.RESPONSES.length).getValues();
  rows.forEach(function(row, index) {
    if (!row[0] || !row[1]) return;

    const key = buildResponseKey_(String(row[0]), String(row[1]));
    map[key] = {
      courseId: String(row[0]),
      participantId: String(row[1]),
      name: String(row[2] || ''),
      status: String(row[3] || ''),
      answeredAt: String(row[4] || ''),
      updatedAt: String(row[5] || ''),
      rowNumber: index + 2
    };
  });

  return map;
}

function buildCourseSummary_(course, participants, responseMap) {
  const statuses = {
    '出席': [],
    '欠席': [],
    '未定': [],
    '未回答': []
  };

  participants.forEach(function(participant) {
    const key = buildResponseKey_(course.id, participant.id);
    const response = responseMap[key];

    if (!response || !response.status) {
      statuses['未回答'].push(participant.name);
      return;
    }

    if (!statuses[response.status]) {
      statuses['未回答'].push(participant.name);
      return;
    }

    statuses[response.status].push(participant.name);
  });

  const todayKey = formatDateKey_(new Date());
  const isPast = course.date < todayKey;
  const isToday = course.date === todayKey;

  return {
    id: course.id,
    title: course.title,
    date: course.date,
    dateLabel: formatCourseDateLabel_(course),
    startTime: course.startTime,
    endTime: course.endTime,
    timeLabel: buildTimeLabel_(course.startTime, course.endTime),
    teacher: course.teacher,
    method: course.method,
    detailUrl: course.detailUrl,
    acceptanceStatus: course.acceptanceStatus,
    note: course.note,
    isPast: isPast,
    isToday: isToday,
    attendeeCount: statuses['出席'].length,
    absenteeCount: statuses['欠席'].length,
    pendingCount: statuses['未定'].length,
    unansweredCount: statuses['未回答'].length,
    totalCount: participants.length,
    attendees: CONFIG.SHOW_PARTICIPANT_NAMES ? statuses['出席'] : [],
    absentees: CONFIG.SHOW_PARTICIPANT_NAMES ? statuses['欠席'] : [],
    pendingParticipants: CONFIG.SHOW_PARTICIPANT_NAMES ? statuses['未定'] : [],
    unansweredParticipants: CONFIG.SHOW_PARTICIPANT_NAMES ? statuses['未回答'] : []
  };
}

function findTodayCourse_(courses) {
  const todayKey = formatDateKey_(new Date());
  return courses.find(function(course) {
    return course.date === todayKey;
  }) || null;
}

function findUpcomingCourse_(courses) {
  const todayKey = formatDateKey_(new Date());
  return courses.find(function(course) {
    return course.date >= todayKey;
  }) || null;
}

function buildDashboardCopyText_(course) {
  if (!course) return '';

  const lines = [
    '【本日のサマースクール】',
    course.title,
    course.dateLabel + ' ' + course.timeLabel,
    '',
    '参加予定：' + course.attendeeCount + '名',
    ''
  ];

  course.attendees.forEach(function(name) {
    lines.push(name);
  });

  return lines.join('\n');
}

function findExistingResponseRow_(sheet, courseId, participantId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const values = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.RESPONSES.length).getValues();
  for (var i = 0; i < values.length; i += 1) {
    if (
      String(values[i][0]) === courseId &&
      String(values[i][1]) === participantId
    ) {
      return {
        rowNumber: i + 2,
        firstAnsweredAt: String(values[i][4] || '')
      };
    }
  }

  return null;
}

function findCourseById_(courseId) {
  return loadCourses_().find(function(course) {
    return course.id === courseId;
  }) || null;
}

function toPublicParticipant_(participant) {
  return {
    id: participant.id,
    name: participant.name,
    discordName: participant.discordName,
    hasPin: Boolean(participant.pin)
  };
}

function buildResponseKey_(courseId, participantId) {
  return courseId + '::' + participantId;
}

function normalizeSheetDate_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return Utilities.formatDate(value, CONFIG.TIMEZONE, 'yyyy-MM-dd');
  }

  const raw = String(value || '').trim();
  if (!raw) return '';
  const normalized = raw.replace(/[./]/g, '-');
  const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) return normalized;

  return [
    match[1],
    ('0' + match[2]).slice(-2),
    ('0' + match[3]).slice(-2)
  ].join('-');
}

function normalizeTime_(value, fallback) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return Utilities.formatDate(value, CONFIG.TIMEZONE, 'HH:mm');
  }

  const raw = String(value || '').trim();
  if (!raw) return fallback || '';

  const match = raw.match(/^(\d{1,2}):(\d{2})/);
  if (match) {
    return ('0' + match[1]).slice(-2) + ':' + match[2];
  }

  return fallback || raw.slice(0, 5);
}

function compareCourses_(a, b) {
  return (a.date + ' ' + a.startTime).localeCompare(b.date + ' ' + b.startTime);
}

function buildTimeLabel_(startTime, endTime) {
  const start = startTime || CONFIG.DEFAULT_START_TIME;
  const end = endTime || CONFIG.DEFAULT_END_TIME;
  return start + '-' + end;
}

function formatCourseDateLabel_(course) {
  const date = parseIsoDate_(course.date);
  const weekNames = ['日', '月', '火', '水', '木', '金', '土'];
  const week = weekNames[date.getDay()];
  return (
    date.getMonth() + 1 +
    '月' +
    date.getDate() +
    '日（' +
    week +
    '）'
  );
}

function parseIsoDate_(isoDate) {
  const parts = String(isoDate || '').split('-').map(function(part) {
    return Number(part);
  });
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDateKey_(date) {
  return Utilities.formatDate(date, CONFIG.TIMEZONE, 'yyyy-MM-dd');
}

function createJsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
