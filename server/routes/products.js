import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import auth, { requireRole } from '../middleware/auth.js';
import {
  getAll, getAllAdmin, getBySlug, create, update, deleteProduct, uploadImage,
} from '../controllers/productController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = Router();

router.get('/', getAll);
router.get('/admin', auth, getAllAdmin);
router.get('/:slug', getBySlug);
router.post('/', auth, requireRole('admin'), upload.single('image'), create);
router.put('/:id', auth, requireRole('admin'), upload.single('image'), update);
router.post('/:id/image', auth, requireRole('admin'), upload.single('image'), uploadImage);
router.delete('/:id', auth, requireRole('admin'), deleteProduct);

export default router;
