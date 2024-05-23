import { connection } from '../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

  if (rows.length > 0) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

  return res.status(201).json({ message: 'User created successfully' });
}
