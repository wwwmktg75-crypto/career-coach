'use server';

import { Resend } from 'resend';

export type ContactState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type ProductRegistrationState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

const inquiryOptions = new Set([
  'デザインテンプレートについて',
  'AIエージェントについて',
  'SaaS・システム開発について',
  '協業・パートナーについて',
  'その他',
]);

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeEmailAddress(value: string) {
  return value.normalize('NFKC').trim();
}

function extractAsciiEmailAddress(value: string) {
  const normalized = normalizeEmailAddress(value);
  const match = normalized.match(/[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  return match ? match[0] : '';
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const email = extractAsciiEmailAddress(String(formData.get('email') || ''));
  const type = String(formData.get('type') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const consent = formData.get('consent');

  const errors: Record<string, string> = {};

  if (!name) errors.name = 'お名前を入力してください。';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '有効なメールアドレスを入力してください。';
  }
  if (!type || !inquiryOptions.has(type)) {
    errors.type = 'お問い合わせ種別を選択してください。';
  }
  if (!message) errors.message = 'お問い合わせ内容を入力してください。';
  if (!consent) errors.consent = '個人情報の取り扱いへの同意が必要です。';

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: '入力内容をご確認ください。',
      errors,
    };
  }

  const payload = {
    name,
    company,
    email,
    type,
    message,
    submittedAt: new Date().toISOString(),
  };

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM || 'First Agent <onboarding@resend.dev>';
  const notificationTo =
    extractAsciiEmailAddress(process.env.CONTACT_NOTIFICATION_TO || '') || 'wwwmktg75@gmail.com';

  if (!resendApiKey) {
    console.info('Contact form demo submission', payload);
    return {
      success: true,
      message:
        'お問い合わせを受け付けました。現在は Resend 未設定のため通知メール送信は無効ですが、導線と入力内容は確認できます。',
    };
  }

  try {
    const resend = new Resend(resendApiKey);

    const safeCompany = company ? escapeHtml(company) : '未入力';
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

    const { error } = await resend.emails.send({
      from: resendFrom,
      to: [notificationTo],
      replyTo: email,
      subject: `【First Agent】お問い合わせ: ${type}`,
      html: `
        <div style="font-family: Arial, 'Hiragino Sans', 'Yu Gothic', sans-serif; color: #0f172a; line-height: 1.8;">
          <h2 style="margin: 0 0 16px;">First Agent お問い合わせ通知</h2>
          <p style="margin: 0 0 24px;">サイトの問い合わせフォームから新しい送信がありました。</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0; width: 160px;"><strong>お名前</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(name)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>会社名・屋号</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${safeCompany}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>メールアドレス</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>お問い合わせ種別</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(type)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>送信日時</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(payload.submittedAt)}</td></tr>
            </tbody>
          </table>
          <div style="margin-top: 24px; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px;"><strong>お問い合わせ内容</strong></p>
            <p style="margin: 0;">${safeMessage}</p>
          </div>
        </div>
      `,
      text: `First Agent お問い合わせ通知

お名前: ${name}
会社名・屋号: ${company || '未入力'}
メールアドレス: ${email}
お問い合わせ種別: ${type}
送信日時: ${payload.submittedAt}

お問い合わせ内容:
${message}
`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: 'お問い合わせありがとうございます。内容を送信しました。確認のうえご連絡いたします。',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        '送信に失敗しました。時間をおいて再度お試しいただくか、下部のメールアドレスからお問い合わせください。',
    };
  }
}

export async function submitProductRegistration(
  _prevState: ProductRegistrationState,
  formData: FormData,
): Promise<ProductRegistrationState> {
  const applicantName = String(formData.get('applicantName') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const email = extractAsciiEmailAddress(String(formData.get('email') || ''));
  const productName = String(formData.get('productName') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const price = String(formData.get('price') || '').trim();
  const deliveryMethod = String(formData.get('deliveryMethod') || '').trim();
  const summary = String(formData.get('summary') || '').trim();
  const support = String(formData.get('support') || '').trim();
  const notes = String(formData.get('notes') || '').trim();
  const consent = formData.get('consent');

  const errors: Record<string, string> = {};

  if (!applicantName) errors.applicantName = 'ご担当者名を入力してください。';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '有効なメールアドレスを入力してください。';
  }
  if (!productName) errors.productName = 'プロダクト名を入力してください。';
  if (!category) errors.category = 'カテゴリを入力してください。';
  if (!price) errors.price = '価格情報を入力してください。';
  if (!deliveryMethod) errors.deliveryMethod = '納品方法を入力してください。';
  if (!summary) errors.summary = '概要を入力してください。';
  if (!support) errors.support = 'サポート内容を入力してください。';
  if (!consent) errors.consent = '個人情報の取り扱いへの同意が必要です。';

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: '入力内容をご確認ください。',
      errors,
    };
  }

  const submittedAt = new Date().toISOString();
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM || 'First Agent <onboarding@resend.dev>';
  const notificationTo =
    extractAsciiEmailAddress(process.env.CONTACT_NOTIFICATION_TO || '') || 'wwwmktg75@gmail.com';

  const payload = {
    applicantName,
    company,
    email,
    productName,
    category,
    price,
    deliveryMethod,
    summary,
    support,
    notes,
    submittedAt,
  };

  if (!resendApiKey) {
    console.info('Product registration demo submission', payload);
    return {
      success: true,
      message:
        '登録内容を受け付けました。現在は Resend 未設定のため通知メール送信は無効ですが、入力内容は確認できます。',
    };
  }

  try {
    const resend = new Resend(resendApiKey);
    const safeCompany = company ? escapeHtml(company) : '未入力';
    const safeNotes = notes ? escapeHtml(notes).replaceAll('\n', '<br />') : '未入力';

    const { error } = await resend.emails.send({
      from: resendFrom,
      to: [notificationTo],
      replyTo: email,
      subject: `【First Agent】プロダクト登録: ${productName}`,
      html: `
        <div style="font-family: Arial, 'Hiragino Sans', 'Yu Gothic', sans-serif; color: #0f172a; line-height: 1.8;">
          <h2 style="margin: 0 0 16px;">First Agent プロダクト登録通知</h2>
          <p style="margin: 0 0 24px;">新しいプロダクト登録フォームの送信がありました。</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0; width: 180px;"><strong>ご担当者名</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(applicantName)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>会社名・屋号</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${safeCompany}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>メールアドレス</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>プロダクト名</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(productName)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>カテゴリ</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(category)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>価格</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(price)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>納品方法</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(deliveryMethod)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>サポート内容</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(support)}</td></tr>
              <tr><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;"><strong>送信日時</strong></td><td style="padding: 10px 0; border-top: 1px solid #e2e8f0;">${escapeHtml(submittedAt)}</td></tr>
            </tbody>
          </table>
          <div style="margin-top: 24px; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px;"><strong>プロダクト概要</strong></p>
            <p style="margin: 0;">${escapeHtml(summary).replaceAll('\n', '<br />')}</p>
          </div>
          <div style="margin-top: 16px; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px;"><strong>補足メモ</strong></p>
            <p style="margin: 0;">${safeNotes}</p>
          </div>
        </div>
      `,
      text: `First Agent プロダクト登録通知

ご担当者名: ${applicantName}
会社名・屋号: ${company || '未入力'}
メールアドレス: ${email}
プロダクト名: ${productName}
カテゴリ: ${category}
価格: ${price}
納品方法: ${deliveryMethod}
サポート内容: ${support}
送信日時: ${submittedAt}

プロダクト概要:
${summary}

補足メモ:
${notes || '未入力'}
`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: 'プロダクト登録を送信しました。内容を確認のうえご連絡いたします。',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message:
        '送信に失敗しました。時間をおいて再度お試しいただくか、メールでご連絡ください。',
    };
  }
}
