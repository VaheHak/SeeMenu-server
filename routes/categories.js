import express from 'express';
import multer from 'multer';
import CategoriesController from '../controllers/CategoriesController';
import permit from '../middlewares/permission';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', CategoriesController.getCategories);
router.get('/single/category', CategoriesController.getSingleCategory);

router.post('/', permit('superadmin', 'admin', 'manager'), upload.single('image'), CategoriesController.createCategories);

router.put('/', permit('superadmin', 'admin', 'manager'), upload.single('image'), CategoriesController.updateCategories);
router.put('/update/available', permit('superadmin', 'admin', 'manager'), CategoriesController.updateAvailable);

router.delete('/:id', permit('superadmin', 'admin'), CategoriesController.deleteCategories);

export default router;
