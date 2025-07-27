import type { NextApiRequest, NextApiResponse } from 'next';
import { getEncryptedPassword } from '@/lib/utils/password-utils';

// Mock users (replace with DB query in production)
const users = [
  {
    id: '1',
    email: 'admin@nitconf.lk',
    passwordHash: getEncryptedPassword('admin123'),
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'admin@techsolutions.com',
    passwordHash: getEncryptedPassword('company123'),
    name: 'Tech Solutions Admin',
    role: 'company',
    company: 'Tech Solutions Ltd',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const passwordHash = getEncryptedPassword(password);
  const user = users.find(
    (u) => u.email === email && u.passwordHash === passwordHash
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Exclude passwordHash from response
  const { passwordHash: _, ...userData } = user;
  return res.status(200).json({ user: userData });
} 