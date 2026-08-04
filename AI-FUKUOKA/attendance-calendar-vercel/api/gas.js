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
