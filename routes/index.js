import express from 'express';

import users from './users';
import restaurant from './restaurant';
import categories from './categories';
import table from './table';
import menus from './menus';
import orders from './orders';
import contact from './contact';
import oauth from './oauth';
import orderItem from './orderItem';

const router = express.Router();

router.use('/users', users);
router.use('/restaurants', restaurant);
router.use('/categories', categories);
router.use('/table', table);
router.use('/menus', menus);
router.use('/orders', orders);
router.use('/contact', contact);
router.use('/oauth', oauth);
router.use('/order/item', orderItem);

export default router;
