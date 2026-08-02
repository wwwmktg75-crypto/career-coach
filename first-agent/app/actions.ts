'use server';

type ContactState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

const defaultState: ContactState = {
  success: false,
  message: '',
};

const inquiryOptions = new Set([
  'デザインテンプレートについて',
  'AIエージェントについて',
  'SaaS・システム開発について',
  '協業・パートナーについて',
  'その他',
]);

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const email = String(formData.get('email') || '').trim();
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

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

  if (!formspreeEndpoint) {
    console.info('Contact form demo submission', payload);
    return {
      success: true,
      message:
        'お問い合わせを受け付けました。現在は開発モードのため外部送信は無効ですが、導線と入力内容は確認できます。',
    };
  }

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Form submission failed: ${response.status}`);
    }

    return {
      success: true,
      message: 'お問い合わせありがとうございます。内容を確認のうえご連絡いたします。',
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

export { defaultState };
