import { Router, Request, Response } from 'express';
import { users } from '../data/data';

const router = Router();

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = `fake-token-${user.id}`;
  
  res.json({ 
    token, 
    user: { 
      id: user.id, 
      username: user.username, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      role: user.role 
    } 
  });
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  const auth = req.header('authorization') || '';
  
  if (!auth.startsWith('Bearer fake-token-')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const id = Number(auth.replace('Bearer fake-token-', ''));
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.json({ 
    id: user.id, 
    username: user.username, 
    firstName: user.firstName, 
    lastName: user.lastName, 
    role: user.role 
  });
});

export default router;