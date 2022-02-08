import express from 'express';
import multer from 'multer';

import RestaurantController from '../controllers/RestaurantController';
import permit from '../middlewares/permission';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get('/all', permit('superadmin'), RestaurantController.allRestaurant);
router.get('/all/branches', permit('superadmin'), RestaurantController.RestaurantBranches);
router.get('/one/restaurant', permit('superadmin'), RestaurantController.oneRestaurant);
router.get('/', permit('superadmin', 'admin'), RestaurantController.userRestaurants);
router.get('/main/restaurant', permit('superadmin', 'admin', 'manager'), RestaurantController.mainRestaurants);
router.get('/restaurant/without/manager', permit('superadmin', 'admin'), RestaurantController.restWithoutManager);
router.get('/single/restaurant', permit('superadmin', 'admin', 'manager'), RestaurantController.singleRestaurant);
router.get('/branches', permit('superadmin', 'admin', 'manager'), RestaurantController.getBranch);
router.get('/for/client', RestaurantController.restaurant);

router.post('/', permit('superadmin', 'admin'), upload.fields([{ name: 'logo', maxCount: 1 }, {
  name: 'cover',
  maxCount: 1,
}]), RestaurantController.postRestaurant);

router.put('/', permit('superadmin', 'admin', 'manager'), upload.fields([{ name: 'logo', maxCount: 1 }, {
  name: 'cover',
  maxCount: 1,
}]), RestaurantController.updateRestaurant);
router.put('/status', permit('superadmin'), RestaurantController.updateStatus);

router.delete('/:id', permit('superadmin', 'admin'), RestaurantController.deleteRestaurant);

export default router;
