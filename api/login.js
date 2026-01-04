import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Missing username or password' });

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const AUTH_SECRET = process.env.AUTH_SECRET;

  if (!ADMIN_USER || !ADMIN_PASSWORD || !AUTH_SECRET) {
    return res.status(500).json({ error: 'Server not configured for admin auth' });
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false });
  }

  const payload = JSON.stringify({ iat: Date.now(), username });
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
  const token = Buffer.from(payload).toString('base64') + '.' + sig;

  res.json({ ok: true, token });
}
