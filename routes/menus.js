import express from 'express';
import multer from 'multer';

import MenusController from '../controllers/MenusController';
import permit from '../middlewares/permission';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const multiFields = (name, maxCount) => {
  const arr = [];
  for (let i = 0; i < maxCount; i++) {
    arr.push({ name: `${name}[${i}]`, maxCount: 1 });
  }
  return upload.fields(arr);
};

router.get('/', MenusController.menus);
router.get('/my/menus', permit('superadmin', 'admin', 'manager'), MenusController.ownerMenus);
router.get('/single/menu', MenusController.menu);
router.get('/single/menu/languages', permit('superadmin', 'admin', 'manager'), MenusController.singleMenu);

router.post('/', permit('superadmin', 'admin', 'manager'), multiFields('image', 5), MenusController.createMenu);

router.put('/multiply/update', permit('superadmin', 'admin', 'manager'), MenusController.updateAll);
router.put('/', permit('superadmin', 'admin', 'manager'), multiFields('image', 5), MenusController.updateMenu);
router.put('/update/menu/available', permit('superadmin', 'admin', 'manager'), MenusController.updateMenuAvailable);

router.delete('/:id', permit('superadmin', 'admin', 'manager'), MenusController.deleteMenu);

export default router;
