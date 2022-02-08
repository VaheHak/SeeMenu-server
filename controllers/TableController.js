import HttpError from 'http-errors';
import _ from 'lodash';
import { Table } from '../models';
import Validate from '../services/validate';

class TableController {
    static getTables = async (req, res, next) => {
      try {
        const { restaurantId } = req.query;

        const table = await Table.findAll({
          where: {
            restaurantId,
          },
          order: [['id', 'DESC']],
        });

        res.json({
          status: 'ok',
          result: table,
        });
      } catch (e) {
        next(e);
      }
    }

    static getTable = async (req, res, next) => {
      try {
        await Validate(req.query, {
          id: 'required|integer',
        });

        const { id } = req.query;

        const table = await Table.findByPk(id);

        res.json({
          status: 'ok',
          result: table,
        });
      } catch (e) {
        next(e);
      }
    }

    static createTable = async (req, res, next) => {
      try {
        await Validate(req.body, {
          restaurantId: 'required|integer',
          number: 'required|string',
          link: 'required|string|url',
          position: 'required|object',
        });

        const {
          restaurantId, number, link, position,
        } = req.body;

        const tables = await Table.findOne({
          where: {
            restaurantId,
            number,
          },
        });

        if (_.isEmpty(tables)) {
          const table = await Table.create({
            restaurantId, number, link, position,
          });

          if (link) {
            table.link = `${link}/${table.id}`;
            await table.save();
          }

          res.json({
            status: 'ok',
            result: table,
          });
          return;
        }

        throw HttpError(403, {
          errors: { number: 'This table has been already created!' },
        });
      } catch (e) {
        next(e);
      }
    }

    static updateTables = async (req, res, next) => {
      try {
        await Validate(req.body, {
          id: 'required|integer',
          restaurantId: 'integer',
          number: 'string',
          link: 'string',
          position: 'object',
        });
        const {
          id, restaurantId, number, link, position,
        } = req.body;
        const tables = await Table.findOne({
          where: {
            restaurantId,
            number,
          },
        });
        if (_.isEmpty(tables)) {
          await Table.update({
            number, link,
          }, {
            where: {
              id,
            },
          });
          res.json({
            status: 'ok',
            message: 'Table number has been updated!',
          });
          return;
        }
        if (!_.isEmpty(position)) {
          await Table.update({
            restaurantId, link, position,
          }, {
            where: {
              id,
            },
          });
          res.json({
            status: 'ok',
          });
          return;
        }
        throw HttpError(403, {
          errors: { number: 'This table has been already created!' },
        });
      } catch (e) {
        next(e);
      }
    }

    static deleteTable = async (req, res, next) => {
      try {
        await Validate(req.params, {
          id: 'required|integer',
        });

        const { id } = req.params;

        await Table.destroy({
          where: {
            id,
          },
        });

        res.json({
          status: 'ok',
          msg: 'Deleted',
        });
      } catch (e) {
        next(e);
      }
    }
}

export default TableController;
