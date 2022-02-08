import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import {
  Categories, Menus, Restaurant, Table, Users,
} from '../models';
import Validate from '../services/validate';
import geoip from '../services/geoip';

class RestaurantController {
  static allRestaurant = async (req, res, next) => {
    try {
      const { s } = req.query;

      const restaurant = await Restaurant.findAll({
        where: {
          $or: [
            { name: { $like: `%${s}%` } },
            { address: { $like: `%${s}%` } },
          ],
        },
        order: [['id', 'DESC']],
      });

      const main = [];
      await Promise.map(restaurant, async (value) => {
        if (value.id === value.branchId) {
          await main.push(value);
        }
      });

      res.json({
        status: 'ok',
        result: main || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static RestaurantBranches = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
      });
      const { id, s } = req.query;
      let search = '';
      if (s) {
        search = s;
      }
      const restaurant = await Restaurant.findAll({
        where: {
          $or: [
            { name: { $like: `%${search}%` } },
            { address: { $like: `%${search}%` } },
          ],
          branchId: id,
        },
        order: [['id', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static oneRestaurant = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
        lang: 'required|string',
      });

      const { id, lang = 'en' } = req.query;

      const restaurant = await Restaurant.findOne({
        where: {
          id,
          status: true,
        },
        include: [{
          model: Categories,
          as: 'categoriesRest',
          where: {
            lang,
            available: true,
          },
          required: false,
          order: [['id', 'DESC']],
        }, {
          model: Menus,
          as: 'menus',
          where: {
            lang,
            available: true,
          },
          required: false,
          order: [['id', 'DESC']],
        }],
        subQuery: false,
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static userRestaurants = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findAll({
        where: {
          $or: {
            userId: req.userId,
            restManagerId: req.userId,
          },
        },
        order: [['id', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static mainRestaurants = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findAll({
        where: {
          $or: {
            restManagerId: req.userId,
            userId: req.userId,
          },
        },
        order: [['id', 'DESC']],
      });
      const user = await Users.findOne({
        where: {
          id: req.userId,
        },
      });
      let result = restaurant;
      if (user.role === 'admin') {
        const main = [];
        _.map(restaurant, (value) => {
          if (value.id === value.branchId) {
            main.push(value);
          }
        });
        result = main;
      }
      res.json({
        status: 'ok',
        result: result || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static restWithoutManager = async (req, res, next) => {
    try {
      const { branchId } = req.query;

      const restaurant = await Restaurant.findAll({
        where: {
          branchId,
          userId: req.userId,
          restManagerId: null,
        },
        order: [['id', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static singleRestaurant = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
        lang: 'required|string',
      });

      const { id, lang = 'en' } = req.query;

      const restaurant = await Restaurant.findOne({
        where: {
          id,
          $or: {
            userId: req.userId,
            restManagerId: req.userId,
          },
          status: true,
        },
        include: [{
          model: Restaurant,
          as: 'restBranches',
          where: {
            branchId: id,
          },
          required: false,
          order: [['id', 'DESC']],
        }, {
          model: Categories,
          as: 'categoriesRest',
          where: {
            lang,
          },
          required: false,
          order: [['id', 'DESC']],
        }, {
          model: Menus,
          as: 'menus',
          where: {
            lang,
          },
          required: false,
          order: [['id', 'DESC']],
        }, {
          model: Table,
          as: 'tables',
          required: false,
        },
        ],
        subQuery: false,
      });

      try {
        const { IpAddress, Location } = geoip;
        const location = await Location();

        if (await IpAddress()) {
          await Restaurant.update({
            ip_address: await IpAddress(),
            lat: location.latitude,
            lon: location.longitude,
            location: `${location.country_name}/${location.region_name}/${location.city_name}`,
          }, {
            where: {
              id,
              userId: req.userId,
            },
          });
        }
      } catch (e) {
        next(e);
      }

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static getBranch = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
      });

      const { id } = req.query;

      const restaurant = await Restaurant.findOne({
        where: {
          id,
          $or: {
            userId: req.userId,
            restManagerId: req.userId,
          },
        },
        include: [{
          model: Restaurant,
          as: 'restBranches',
          where: {
            branchId: id,
          },
          required: false,
          order: [['id', 'DESC']],
        }],
      });

      res.json({
        status: 'ok',
        result: restaurant,
      });
    } catch (e) {
      next(e);
    }
  }

  static restaurant = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
        lang: 'string',
      });

      const {
        id, lang = 'en',
      } = req.query;

      const categoryFilter = {};

      if (lang) {
        categoryFilter.lang = lang;
      }

      const restaurant = await Restaurant.findOne({
        where: {
          id,
          status: true,
        },
        order: [['id', 'DESC']],
        include: [{
          model: Categories,
          as: 'categoriesRest',
          where: categoryFilter,
          required: false,
          order: [['id', 'DESC']],
        }, {
          model: Users,
          as: 'usersRest',
          attributes: ['email'],
          required: false,
        }, {
          model: Users,
          as: 'restManager',
          attributes: ['email'],
          required: false,
        }],
      });

      res.json({
        status: 'ok',
        result: restaurant || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static postRestaurant = async (req, res, next) => {
    try {
      const {
        name, subName, link, phone, timing, address, branchId,
      } = req.body;

      await Validate(req.body, {
        name: 'required|string|minLength:2|maxLength:20',
        subName: 'string|minLength:3|maxLength:20',
        link: 'required|string',
        phone: 'required|string|minLength:9|maxLength:12',
        timing: 'string',
        address: 'required|string',
        branchId: 'string',
      }, { phone, timing });
      await Validate(req.files.logo, {
        0: 'mime:jpg,png,gif',
      }, undefined, undefined, { 0: 'The logo must be a file of type: jpg,png,gif.' });
      await Validate(req.files.cover, {
        0: 'mime:jpg,png,gif',
      }, undefined, undefined, { 0: 'The cover must be a file of type: jpg,png,gif.' });

      const { userId } = req;

      const restaurant = await Restaurant.create({
        name, subName, link, phone, timing, address, userId, branchId,
      });

      if (_.isEmpty(branchId)) {
        restaurant.branchId = restaurant.id;
        await restaurant.save();
      }

      if (restaurant.branchId !== restaurant.id) {
        const images = await Restaurant.findByPk(restaurant.branchId);
        restaurant.logo = images.logo;
        restaurant.cover = images.cover;
        await restaurant.save();
        if (branchId) {
          const categories = await Categories.findAll({
            where: {
              restaurantId: images.id,
            },
            raw: true,
          });
          const menus = await Menus.findAll({
            where: {
              restaurantId: images.id,
            },
            raw: true,
          });
          await Promise.map(categories, async (c) => {
            const category = await Categories.create({
              ...c,
              id: undefined,
              sourceId: undefined,
              restaurantId: restaurant.id,
            });
            category.sourceId = category.id;
            await category.save();
            const childCategory = categories.filter((v) => v.sourceId === c.id
              && v.lang !== c.lang).map((v) => ({
              ...v,
              id: undefined,
              sourceId: category.id,
              restaurantId: restaurant.id,
              restBranchId: branchId,
            }));
            await Categories.bulkCreate(childCategory);
            const catMenus = menus.filter((m) => m.categoryId === c.id && m.sourceId === m.id);
            return Promise.map(catMenus, async (m) => {
              const menu = await Menus.create({
                ...m,
                id: undefined,
                sourceId: undefined,
                restaurantId: restaurant.id,
                categoryId: category.id,
                restaurantBranchId: branchId,
              });
              menu.sourceId = menu.id;
              await menu.save();
              const childMenus = menus.filter((v) => v.sourceId === m.id
                && v.lang !== m.lang).map((v) => ({
                ...v,
                id: undefined,
                sourceId: menu.id,
                restaurantId: restaurant.id,
                restaurantBranchId: branchId,
              }));
              return Menus.bulkCreate(childMenus);
            });
          });
        }
      } else if (!_.isEmpty(req.files)) {
        const logo = _.get(req.files, 'logo.0');
        const cover = _.get(req.files, 'cover.0');
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
        };
        const imageDir = `public/images/restaurants/${restaurant.id}/`;
        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }
        if (!_.isEmpty(logo)) {
          const logoName = `${logo.fieldname}-${Date.now()}${fileTypes[logo.mimetype]}`;
          const logoFileName = `${global.serverUrl}/images/restaurants/${restaurant.id}/${logoName}`;
          fs.writeFileSync(imageDir + logoName, logo.buffer);
          restaurant.logo = logoFileName;
        }
        if (!_.isEmpty(cover)) {
          const coverName = `${cover.fieldname}-${Date.now()}${fileTypes[cover.mimetype]}`;
          const coverFileName = `${global.serverUrl}/images/restaurants/${restaurant.id}/${coverName}`;
          fs.writeFileSync(imageDir + coverName, cover.buffer);
          restaurant.cover = coverFileName;
        }
        await restaurant.save();
      }

      res.json({
        status: 'ok',
        result: restaurant,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateRestaurant = async (req, res, next) => {
    try {
      const {
        id, name, subName, link, phone, timing, address, branchId,
      } = req.body;
      await Validate(req.body, {
        id: 'required|integer',
        name: 'string|minLength:2|maxLength:20',
        subName: 'string|minLength:3|maxLength:20',
        link: 'string|url',
        phone: 'string|minLength:9|maxLength:12',
        timing: 'string',
        address: 'string',
        branchId: 'string',
      }, { phone, timing });
      await Validate(req.files.logo, {
        0: 'mime:jpg,png,gif',
      }, undefined, undefined, { 0: 'The logo must be a file of type: jpg,png,gif.' });
      await Validate(req.files.cover, {
        0: 'mime:jpg,png,gif',
      }, undefined, undefined, { 0: 'The cover must be a file of type: jpg,png,gif.' });

      let logoName;
      let coverName;

      if (!_.isEmpty(req.files)) {
        const logo = _.get(req.files, 'logo.0');
        const cover = _.get(req.files, 'cover.0');
        const oldImage = await Restaurant.findByPk(id);

        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
        };

        const imageDir = `public/images/restaurants/${id}/`;

        if (!_.isEmpty(logo) && !_.isEmpty(logo.buffer)) {
          if (oldImage.logo && fs.existsSync(imageDir)) {
            fs.rmdirSync(oldImage.logo, { recursive: true });
          }
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
          }

          const logoFileName = `${logo.fieldname}-${Date.now()}${fileTypes[logo.mimetype]}`;
          logoName = `${global.serverUrl}/images/restaurants/${id}/${logoFileName}`;
          fs.writeFileSync(imageDir + logoFileName, logo.buffer);
        } else if (_.isEmpty(logo)) {
          fs.mkdirSync(imageDir, { recursive: true });
          logoName = logo;
        } else {
          logoName = oldImage.logo;
        }

        if (!_.isEmpty(cover) && !_.isEmpty(cover.buffer)) {
          if (oldImage.cover && fs.existsSync(imageDir)) {
            fs.rmdirSync(oldImage.cover, { recursive: true });
          }
          if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, { recursive: true });
          }

          const coverFileName = `${cover.fieldname}-${Date.now()}${fileTypes[cover.mimetype]}`;
          coverName = `${global.serverUrl}/images/restaurants/${id}/${coverFileName}`;
          fs.writeFileSync(imageDir + coverFileName, cover.buffer);
        } else if (_.isEmpty(cover)) {
          fs.mkdirSync(imageDir, { recursive: true });
          coverName = cover;
        } else {
          coverName = oldImage.cover;
        }
      }

      const restaurant = await Restaurant.update({
        name,
        subName,
        link,
        phone,
        timing,
        address,
        logo: logoName,
        cover: coverName,
        branchId,
      }, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: restaurant,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateStatus = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        status: 'required|boolean',
      });

      const { id, status } = req.body;

      const restaurant = await Restaurant.update({
        status,
      }, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: restaurant,
      });
    } catch (e) {
      next(e);
    }
  }

  static deleteRestaurant = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });

      const { id } = req.params;

      const restaurant = await Restaurant.destroy({
        where: {
          id,
        },
      });

      const imageDir = `public/images/restaurants/${id}/`;

      if (fs.existsSync(imageDir)) {
        fs.rmdirSync(imageDir, { recursive: true });
      }

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: restaurant,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default RestaurantController;
