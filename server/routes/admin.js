import { Router } from 'express';
import { login, getMe, getUsers, createUser, updateUser, deleteUser } from '../controllers/adminController.js';
import auth, { requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.get('/me', auth, getMe);

// User management — admin only
router.get('/users', auth, requireRole('admin'), getUsers);
router.post('/users', auth, requireRole('admin'), createUser);
router.put('/users/:id', auth, requireRole('admin'), updateUser);
router.delete('/users/:id', auth, requireRole('admin'), deleteUser);

export default router;
