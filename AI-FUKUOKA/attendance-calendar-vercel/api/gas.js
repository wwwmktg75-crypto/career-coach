module.exports = async function handler(req, res) {
  const gasUrl = process.env.GAS_WEB_APP_URL;

  if (!gasUrl) {
    return res.status(500).json({
      ok: false,
      message: '環境変数 GAS_WEB_APP_URL が未設定です。'
    });
  }

  try {
    if (req.method === 'GET') {
      const url = new URL(gasUrl);
      url.searchParams.set('api', '1');
      Object.entries(req.query || {}).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => url.searchParams.append(key, item));
          return;
        }
        url.searchParams.set(key, value);
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      const text = await response.text();
      const normalized = String(text || '').trim();
      const contentType = response.headers.get('content-type') || '';

      if (looksLikeHtml_(normalized, contentType)) {
        return res.status(502).json({
          ok: false,
          message: buildHtmlErrorMessage_(normalized)
        });
      }

      return res
        .status(response.ok ? 200 : response.status)
        .setHeader('Content-Type', 'application/json; charset=utf-8')
        .send(text);
    }

    if (req.method === 'POST') {
      const url = new URL(gasUrl);
      url.searchParams.set('api', '1');

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(req.body || {})
      });
      const text = await response.text();
      const normalized = String(text || '').trim();
      const contentType = response.headers.get('content-type') || '';

      if (looksLikeHtml_(normalized, contentType)) {
        return res.status(502).json({
          ok: false,
          message: buildHtmlErrorMessage_(normalized)
        });
      }

      return res
        .status(response.ok ? 200 : response.status)
        .setHeader('Content-Type', 'application/json; charset=utf-8')
        .send(text);
    }

    return res.status(405).json({
      ok: false,
      message: 'Method Not Allowed'
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message || 'GAS との通信に失敗しました。'
    });
  }
};

function looksLikeHtml_(text, contentType) {
  return (
    String(contentType).toLowerCase().includes('text/html') ||
    /^<!doctype html/i.test(text) ||
    /^<html/i.test(text)
  );
}

function buildHtmlErrorMessage_(html) {
  const lower = String(html || '').toLowerCase();

  if (
    lower.includes('google accounts') ||
    lower.includes('serviceLogin'.toLowerCase()) ||
    lower.includes('sign in')
  ) {
    return 'GAS がログイン画面を返しています。Web アプリの公開設定を「全員」にしてください。';
  }

  if (lower.includes('script') && lower.includes('error')) {
    return 'GAS がエラーページを返しています。Apps Script のデプロイ設定か実行ログを確認してください。';
  }

  return 'GAS から JSON ではなく HTML が返りました。Web アプリURLと公開設定を確認してください。';
}
