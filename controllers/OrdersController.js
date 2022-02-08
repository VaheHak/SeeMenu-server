import moment from 'moment';
import { QROrder, Restaurant } from '../models';
import Validate from '../services/validate';

class OrdersController {
  static getAllOrders = async (req, res, next) => {
    try {
      const {
        restaurantName, address, phone, email, createdAt, status,
      } = req.query;

      const where = {};

      if (restaurantName) {
        where.name = { $like: `%${restaurantName}%` };
      }
      if (address) {
        where.address = { $like: `%${address}%` };
      }
      if (phone) {
        where.phone = { $like: `%${phone}%` };
      }
      if (email) {
        where.email = { $like: `%${email}%` };
      }

      const whereSecond = {};

      if (createdAt) {
        const y = moment(createdAt);
        whereSecond.createdAt = {
          $gte: new Date(y.format('YYYY-MM-DD 00:00:00')),
          $lte: new Date(y.format('YYYY-MM-DD 23:59:59')),
        };
      }

      if (status) {
        whereSecond.status = { $like: `%${status}%` };
      }

      const orders = await QROrder.findAll({
        where: whereSecond,
        include: [{
          model: Restaurant,
          as: 'qrOrderRest',
          required: true,
          where,
        }],
      });

      res.json({
        status: 'ok',
        result: orders,
      });
    } catch (e) {
      next(e);
    }
  }

  static getOrders = async (req, res, next) => {
    try {
      await Validate(req.query, {
        restaurantId: 'required|integer',
      });

      const { restaurantId, createdAt, status } = req.query;

      const where = {
        restaurantQrId: restaurantId,
      };

      if (createdAt) {
        const y = moment(createdAt);
        where.createdAt = {
          $gte: new Date(y.format('YYYY-MM-DD 00:00:00')),
          $lte: new Date(y.format('YYYY-MM-DD 23:59:59')),
        };
      }

      if (status) {
        where.status = { $like: `%${status}%` };
      }

      const qrOrder = await QROrder.findAll({
        where,
      });

      res.json({
        status: 'ok',
        result: qrOrder || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static getSingleOrder = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
      });

      const { id } = req.query;

      const qrSingleOrder = await QROrder.findOne({
        where: { id },
        include: [{
          model: Restaurant,
          as: 'qrOrderRest',
          required: true,
        }],
      });

      res.json({
        status: 'ok',
        result: qrSingleOrder || {},
      });
    } catch (e) {
      next(e);
    }
  }

  static creatQrOrder = async (req, res, next) => {
    try {
      await Validate(req.body, {
        tables: 'required|object',
        template: 'required|integer|min:0',
        restaurantId: 'required|integer|min:0',
        styles: 'required|object',
      });

      const {
        tables, template, restaurantId, styles,
      } = req.body;

      const qrOrder = await QROrder.create({
        tables,
        template,
        restaurantQrId: restaurantId,
        styles,
        status: 'pending',
      });

      res.json({
        status: 'ok',
        result: qrOrder,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateQrOrder = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        styles: 'required|object',
        status: 'required|string',
      });

      const {
        id, styles, status,
      } = req.body;

      const qrOrder = await QROrder.update({
        styles,
        status,
      }, {
        where: { id },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: qrOrder,
      });
    } catch (e) {
      next(e);
    }
  }

  static deleteQrOrder = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });

      const { id } = req.params;

      const order = await QROrder.destroy({
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: order,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default OrdersController;
