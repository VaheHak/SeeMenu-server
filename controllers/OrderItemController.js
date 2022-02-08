import _ from 'lodash';
import Promise from 'bluebird';
import HttpError from 'http-errors';
import Validate from '../services/validate';
import {
  Menus,
  Order,
  OrderLiner, Users,
} from '../models';

class OrderItemController {
  static getSingleOrder = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
      });

      const { id } = req.query;

      const order = await Order.findOne({
        where: {
          id,
        },
        include: [{
          model: OrderLiner,
          as: 'orderLiners',
          where: {
            orderId: id,
          },
        }],
      });

      res.json({
        status: 'ok',
        result: order,
      });
    } catch (e) {
      next(e);
    }
  }

  static getAllOrders = async (req, res, next) => {
    try {
      await Validate(req.query, {
        restaurantId: 'required|integer',
        tableId: 'integer',
      });

      const { restaurantId, tableId } = req.query;

      const { userId } = req;

      const where = {
        restaurantId,
      };

      const user = await Users.findOne({
        where: {
          id: userId,
        },
      });

      if (user.role === 'user') {
        where.userId = userId;
      }

      if (tableId) {
        where.tableId = tableId;
      }

      const order = await Order.findAll({
        where,
      });

      res.json({
        status: 'ok',
        result: order,
      });
    } catch (e) {
      next(e);
    }
  }

  static createOrder = async (req, res, next) => {
    try {
      await Validate(req.body, {
        restaurantId: 'required|integer',
        tableId: 'required|integer',
        price: 'required|string',
      });

      const {
        orderData, restaurantId, tableId, price,
      } = req.body;

      const { userId } = req;

      const order = await Order.create({
        restaurantId,
        userId,
        tableId,
        price,
      });

      _.map(orderData, async (item) => {
        const menuItem = await Menus.findOne({
          where: {
            sourceId: item.sourceId,
          },
        });

        await OrderLiner.create({
          price: item.price,
          count: item.count,
          orderId: order.id,
          name: menuItem.name,
          description: menuItem.types ? menuItem.types[item.index].type : null,
        });
      });

      res.json({
        status: 'ok',
        result: order,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateOrder = async (req, res, next) => {
    try {
      await Validate(req.body, {
        orderId: 'required|integer',
        price: 'required|string',
      });

      const {
        orderData, orderId, price,
      } = req.body;

      const orderStatus = await Order.findOne({
        where: {
          id: orderId,
        },
      });

      console.log(orderStatus.status);
      let orders;

      if (orderStatus.status === 'pending') {
        Order.update({ price }, {
          where: {
            id: orderId,
          },
        });

        orders = await Promise.map(orderData, (order) => OrderLiner.update({
          price: order.price,
          count: order.count,
        }, {
          where: {
            id: order.itemId,
          },
        }));
      } else {
        throw HttpError(403, { errors: { status: "Sorry you can't update this order, it already in progress!" } });
      }

      res.json({
        status: 'ok',
        result: orders,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateOrderStatus = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        status: 'required|string',
      });

      const {
        id, status,
      } = req.body;

      const order = Order.update({ status }, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        result: order,
      });
    } catch (e) {
      next(e);
    }
  }

  static deleteOrder = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });

      const { id } = req.params;

      const order = await Order.findOne({
        where: {
          id,
        },
      });
      let result;

      if (order.status === 'pending') {
        result = await Order.destroy({
          where: {
            id,
          },
        });
      } else {
        throw HttpError(403, { errors: { status: "Sorry you can't update this order, it already in progress!" } });
      }

      res.json({
        status: 'ok',
        result,
      });
    } catch (e) {
      next(e);
    }
  }

  static deleteOrderItem = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
        orderId: 'required|integer',
      });

      const { orderId, id } = req.params;

      const order = await OrderLiner.findOne({
        where: {
          id,
        },
        include: [{
          model: Order,
          as: 'orderInfo',
          where: {
            id: orderId,
          },
        }],
      });

      let result;

      if (order.orderInfo.status === 'pending') {
        result = await OrderLiner.destroy({
          where: {
            id,
          },
        });
      } else {
        throw HttpError(403, { errors: { status: "Sorry you can't update this order, it already in progress!" } });
      }

      res.json({
        status: 'ok',
        result,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default OrderItemController;
