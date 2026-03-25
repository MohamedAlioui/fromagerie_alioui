import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Identifiants incorrects' });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Identifiants incorrects' });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, role: admin.role, username: admin.username });
  } catch (err) { next(err); }
};

export const getMe = (req, res) => {
  res.json({ id: req.admin.id, username: req.admin.username, role: req.admin.role });
};

// --- User management (admin only) ---

export const getUsers = async (req, res, next) => {
  try {
    const users = await Admin.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { next(err); }
};

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username et password requis' });
    const exists = await Admin.findOne({ username });
    if (exists) return res.status(409).json({ error: 'Ce nom d\'utilisateur existe déjà' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Admin.create({ username, email: email || '', passwordHash, role: role || 'commercial' });
    res.status(201).json({ id: user._id, username: user.username, email: user.email, role: user.role });
  } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;
    // Prevent demoting yourself
    if (req.params.id === req.admin.id && role && role !== 'admin') {
      return res.status(400).json({ error: 'Vous ne pouvez pas modifier votre propre rôle' });
    }
    const updates = {};
    if (username) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (role) updates.role = role;
    if (password) updates.passwordHash = await bcrypt.hash(password, 10);

    const user = await Admin.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.admin.id) {
      return res.status(400).json({ error: 'Vous ne pouvez pas supprimer votre propre compte' });
    }
    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json({ success: true });
  } catch (err) { next(err); }
};
