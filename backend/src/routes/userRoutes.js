import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import sqliteDB from '../config/sqlite.js';

const router = express.Router();

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Informe e-mail e senha.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = generateToken(user._id);

    if (sqliteDB) {
      sqliteDB.run(
        'INSERT INTO login_logs (user_id, email) VALUES (?, ?)',
        [user._id.toString(), user.email],
        (err) => {
          if (err) console.error('Erro ao salvar log de login em SQLite:', err.message);
        }
      );
    }

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erro ao autenticar.' });
  }
});

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
});

router.get('/me/addresses', protect, async (req, res) => {
  const user = await User.findById(req.user).select('addresses');
  res.json(user?.addresses || []);
});

router.post('/me/addresses', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const addr = req.body;
  user.addresses.push(addr);
  await user.save();
  res.status(201).json(user.addresses[user.addresses.length - 1]);
});

router.put('/me/addresses/:addrId', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const a = user.addresses.id(req.params.addrId);
  if (!a) return res.status(404).json({ message: 'Endereço não encontrado' });

  Object.assign(a, req.body);
  await user.save();
  res.json(a);
});

router.delete('/me/addresses/:addrId', protect, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const a = user.addresses.id(req.params.addrId);
  if (!a) return res.status(404).json({ message: 'Endereço não encontrado' });

  a.deleteOne();
  await user.save();
  res.status(204).end();
});

router.get('/login-logs', protect, async (req, res) => {
  sqliteDB.all('SELECT * FROM login_logs ORDER BY created_at DESC LIMIT 50', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erro ao buscar logs' });
    }
    res.json(rows);
  });
});

export default router;
