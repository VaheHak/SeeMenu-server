import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import sharp from 'sharp';
import HttpError from 'http-errors';
import { Menus } from '../models';
import Validate from '../services/validate';

class MenusController {
  static menus = async (req, res, next) => {
    try {
      await Validate(req.query, {
        lang: 'required|string',
        restaurantId: 'required|integer',
        categoryId: 'required|integer',
        s: 'string',
        p: 'required|integer',
        vegan: 'string',
        beginPrice: 'string',
        finishPrice: 'string',
      });
      const {
        s = '', lang, restaurantId, categoryId, p, vegan, beginPrice, finishPrice,
      } = req.query;
      const langFilter = {};
      if (lang) {
        langFilter.lang = lang;
      }
      if (categoryId) {
        langFilter.categoryId = categoryId;
      }
      if (vegan) {
        langFilter.vegan = vegan;
      }
      if (beginPrice || finishPrice) {
        langFilter.price = { $between: [beginPrice, finishPrice] };
      }
      const options = {
        page: p,
        paginate: 50,
        order: [['id', 'DESC']],
        where: [
          langFilter,
          { restaurantId, available: true },
          {
            $or: [
              { name: { $like: `${s}%` } },
              { description: { $like: `%${s}%` } },
            ],
          },
        ],
      };
      const { docs: menus, pages, total } = await Menus.paginate(options);
      res.json({
        result: menus || [],
        pages,
        total,
      });
    } catch (e) {
      next(e);
    }
  };

  static ownerMenus = async (req, res, next) => {
    try {
      await Validate(req.query, {
        lang: 'required|string',
        restaurantId: 'required|integer',
        categoryId: 'required|integer',
        s: 'string',
        p: 'required|integer',
      });

      const {
        s = '', lang, restaurantId, categoryId, p = 1,
      } = req.query;

      const langFilter = {};

      if (lang) {
        langFilter.lang = lang;
      }
      if (categoryId) {
        langFilter.categoryId = categoryId;
      }

      const options = {
        where: [
          langFilter,
          { restaurantId },
          {
            $or: [
              { name: { $like: `%${s}%` } },
              { price: { $like: `%${s}%` } },
            ],
          },
        ],
        page: p,
        paginate: 10,
        order: [['id', 'DESC']],
      };

      const { docs: menus, pages, total } = await Menus.paginate(options);

      res.json({
        status: 'ok',
        result: menus || [],
        total,
        totalPage: pages,
      });
    } catch (e) {
      next(e);
    }
  }

  static menu = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
        lang: 'required|string',
        restaurantId: 'required|integer',
        restaurantBranchId: 'required|integer',
        categoryId: 'required|integer',
      });

      const {
        id, lang, restaurantId, categoryId, restaurantBranchId,
      } = req.query;

      const langFilter = {};

      if (lang) {
        langFilter.lang = lang;
      }
      if (restaurantId) {
        langFilter.restaurantId = restaurantBranchId;
      }
      if (categoryId) {
        langFilter.categoryId = categoryId;
      }

      const menu = await Menus.findAll({
        where: [
          { id },
          langFilter,
          { available: true },
        ],
        include: [{
          model: Menus,
          as: 'languages',
        }],
        order: [['id', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: menu || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static singleMenu = async (req, res, next) => {
    try {
      await Validate(req.query, {
        sourceId: 'required|integer',
        categoryId: 'required|integer',
      });

      const {
        sourceId, categoryId,
      } = req.query;

      const langFilter = {};

      if (categoryId) {
        langFilter.categoryId = categoryId;
      }

      const menu = await Menus.findAll({
        where: [
          { sourceId },
          langFilter,
        ],
      });

      res.json({
        status: 'ok',
        result: menu || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static createMenu = async (req, res, next) => {
    try {
      await Validate(req.body, {
        name: 'required|string|minLength:2',
        price: 'integer|min:0',
        vegan: 'required|string',
        description: 'string',
        restaurantId: 'required|integer',
        categoryId: 'required|integer',
        lang: 'string',
        // types: 'array',
      });

      const {
        name, price, vegan, description, restaurantId,
        categoryId, lang, sourceId, restaurantBranchId,
        types,
      } = req.body;

      const menu = await Menus.create({
        name,
        price,
        vegan,
        description,
        restaurantId,
        categoryId,
        lang,
        sourceId,
        restaurantBranchId,
        types,
      });

      if (_.isEmpty(sourceId)) {
        menu.sourceId = menu.id;
        await menu.save();
      }

      const files = Object.values(req.files).flat(1);

      if (!_.isEmpty(files)) {
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
        };

        const imageDir = `public/images/menus/${menu.id}/`;
        let arr = [];

        if (!_.isEmpty(menu.image) && _.isArray(menu.image)) arr = [...menu.image];

        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
          for (const image of files) {
            const singleImage = `${image.fieldname}-${Date.now()}${fileTypes[image.mimetype]}`;
            const imageFileName = `${global.serverUrl}/images/menus/${menu.id}/${singleImage}`;
            await sharp(image.buffer)
              .resize(200, 200, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255 },
              })
              .toFile(imageDir + singleImage);

            arr.push(imageFileName);
          }
        }

        menu.image = arr;
      }

      await menu.save();

      res.json({
        status: 'ok',
        result: menu,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateAll = async (req, res, next) => {
    try {
      const { menus } = req.body;

      for (const value of menus) {
        const menuLang = await Menus.findAll({
          where: {
            sourceId: value.id,
          },
          raw: true,
        });

        if (typeof value.index === 'number') {
          await Promise.map(menuLang, (menu) => {
            const { types } = menu;
            types[value.index].price = value.price;
            return Menus.update({
              types,
            }, {
              where: {
                id: menu.id,
              },
            });
          });
        } else {
          await Promise.map(menuLang, (val) => Menus.update({
            price: value.price,
          }, {
            where: {
              id: val.id,
            },
          }));
        }
      }

      res.json({
        status: 'ok',
        msg: 'Updated',
      });
    } catch (e) {
      next(e);
    }
  }

  static updateMenu = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'integer',
        name: 'string|minLength:2',
        price: 'integer|min:0',
        vegan: 'string',
        description: 'string',
        categoryId: 'integer',
        lang: 'string',
        sourceId: 'integer',
        available: 'boolean',
      });

      const {
        id, name, price, vegan, description, categoryId, image,
        lang, sourceId, restaurantId, restaurantBranchId, available,
        types,
      } = req.body;

      const menus = await Menus.findOne({
        where: {
          sourceId,
          lang,
        },
      });

      if (_.isEmpty(menus)) {
        const parentMenu = await Menus.findOne({
          where: {
            id: sourceId,
            sourceId,
          },
        });
        if (!_.isEmpty(parentMenu)) {
          const newMenu = await Menus.create({
            name,
            price: price || null,
            vegan,
            description,
            categoryId,
            lang,
            sourceId,
            restaurantId,
            restaurantBranchId,
            types,
            available,
          });

          if (!_.isEmpty(req.files)) {
            const images = req.files;
            const fileTypes = {
              'image/jpeg': '.jpg',
              'image/png': '.png',
              'image/gif': '.gif',
            };

            const imageDir = `public/images/menus/${newMenu.id}/`;
            let arr = [];

            if (!_.isEmpty(newMenu.image) && _.isArray(newMenu.image)) arr = [...newMenu.image];

            if (!fs.existsSync(imageDir)) {
              fs.mkdirSync(imageDir, { recursive: true });
            }

            for (const img of images) {
              const singleImage = `${img.fieldname}-${Date.now()}${fileTypes[img.mimetype]}`;
              const imageFileName = `${global.serverUrl}/images/categories/${newMenu.id}/${singleImage}`;
              await sharp(img.buffer)
                .resize(300, 300, {
                  fit: 'contain',
                  background: { r: 255, g: 255, b: 255 },
                })
                .toFile(imageDir + singleImage);

              arr.push(imageFileName);
            }

            newMenu.image = arr;
            await newMenu.save();
          } else {
            newMenu.image = image;
            await newMenu.save();
          }

          res.json({
            status: 'Created',
            result: newMenu,
          });
          return;
        }
        throw HttpError(403, { errors: { status: 'Ignore' } });
      }

      const files = Object.values(req.files).flat(1);

      if (!_.isEmpty(files)) {
        const removeDir = `public/images/menus/${id}/`;

        if (fs.existsSync(removeDir)) {
          fs.rmdirSync(removeDir, { recursive: true });
        }

        const newDir = `public/images/menus/${id}/`;

        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }

        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
        };

        const arr = [];

        for (const img of files) {
          const singleImage = `${img.fieldname}-${Date.now()}${fileTypes[img.mimetype]}`;
          const imageFileName = `${global.serverUrl}/images/menus/${id}/${singleImage}`;
          await sharp(img.buffer)
            .resize(200, 200, {
              fit: 'contain',
              background: { r: 255, g: 255, b: 255 },
            })
            .toFile(newDir + singleImage);

          arr.push(imageFileName);
        }

        const menu = await Menus.update({
          name,
          price: price || null,
          vegan,
          description,
          categoryId,
          image: arr,
          lang,
          sourceId,
          restaurantId,
          restaurantBranchId,
          types,
          available,
        }, {
          where: {
            id,
          },
        });

        res.json({
          status: 'ok',
          msg: 'Updated',
          result: menu,
        });
        return;
      }

      const a = await Menus.update({
        name,
        price: price || null,
        vegan,
        description,
        categoryId,
        image,
        lang,
        sourceId,
        restaurantId,
        restaurantBranchId,
        types,
        available,
      }, {
        where: {
          id,
          lang,
        },
      });

      res.json({
        a,
        status: 'ok',
        msg: 'Updated',
      });
    } catch (e) {
      next(e);
    }
  }

  static updateMenuAvailable = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        sourceId: 'required|integer',
        categoryId: 'integer',
        restaurantId: 'required|integer',
        available: 'required|boolean',
      });

      const {
        id, sourceId, categoryId, available, restaurantId,
      } = req.body;

      const menuLang = await Menus.findAll({
        where: {
          sourceId, categoryId, id, restaurantId,
        },
      });

      const availUpdate = await Promise.map(menuLang, (val) => Menus.update({
        available,
      }, {
        where: {
          id: val.id,
        },
      }));

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: availUpdate || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static deleteMenu = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });

      const { id } = req.params;

      const image = await Menus.findByPk(id);

      const count = await Menus.findAll({
        where: {
          image: image.image,
          id: { $ne: id },
        },
      });

      const menu = await Menus.destroy({
        where: {
          id,
        },
      });

      if (_.isEmpty(count)) {
        const imageDir = `public/images/menus/${id}/`;
        if (fs.existsSync(imageDir)) {
          fs.rmdirSync(imageDir, { recursive: true });
        }
      }

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: menu,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default MenusController;
