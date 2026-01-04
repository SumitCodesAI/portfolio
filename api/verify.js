import crypto from 'crypto';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  if (!token) return res.status(400).json({ ok: false });

  const AUTH_SECRET = process.env.AUTH_SECRET || 'dev_secret';
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return res.status(400).json({ ok: false });

  try {
    const payload = Buffer.from(b64, 'base64').toString();
    const expected = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
    if (sig !== expected) return res.status(401).json({ ok: false });

    const data = JSON.parse(payload);
    // optional: check issued time if you want expiry
    return res.json({ ok: true, data });
  } catch (err) {
    return res.status(400).json({ ok: false });
  }
}
