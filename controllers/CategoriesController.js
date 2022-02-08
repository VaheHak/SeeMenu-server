import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import sharp from 'sharp';
import HttpError from 'http-errors';
import { Menus, Categories } from '../models';
import Validate from '../services/validate';

class CategoriesController {
  static getCategories = async (req, res, next) => {
    try {
      await Validate(req.query, {
        restaurantId: 'required|integer',
        restBranchId: 'integer',
        lang: 'required|string',
      });

      const { restaurantId, lang = 'en' } = req.query;

      const category = await Categories.findAll({
        where: {
          restaurantId,
          lang,
        },
        include: [{
          model: Menus,
          as: 'catMenus',
          where: {
            lang,
          },
          required: false,
        }],
        order: [['id', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: category || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static getSingleCategory = async (req, res, next) => {
    try {
      await Validate(req.query, {
        id: 'required|integer',
      });

      const { id } = req.query;

      const category = await Categories.findAll({
        where: {
          $or: [
            { id },
            { sourceId: id },
          ],
        },
        order: [['id', 'DESC']],
      });

      res.json({
        status: 'ok',
        result: category || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static createCategories = async (req, res, next) => {
    try {
      await Validate(req.body, {
        name: 'required|string|minLength:2',
        restaurantId: 'required|integer',
        lang: 'required|string',
      });
      await Validate(req, {
        file: 'mime:jpg,png,gif',
      });

      const {
        name, restaurantId, lang, sourceId, restBranchId,
      } = req.body;

      const category = await Categories.create({
        name,
        restaurantId,
        lang,
        sourceId,
        restBranchId,
      });

      if (_.isEmpty(sourceId)) {
        category.sourceId = category.id;
        await category.save();
      }

      if (!_.isEmpty(req.file)) {
        const image = req.file;
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
        };

        const imageDir = `public/images/categories/${category.id}/`;

        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }
        const images = `${image.fieldname}-${Date.now()}${fileTypes[image.mimetype]}`;
        const imageFileName = `${global.serverUrl}/images/categories/${category.id}/${images}`;
        await sharp(image.buffer)
          .resize(300, 300, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255 },
          })
          .toFile(imageDir + images);
        category.image = imageFileName;
        await category.save();
      }

      res.json({
        status: 'ok',
        result: category,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateCategories = async (req, res, next) => {
    try {
      await Validate(req.body, {
        name: 'string|minLength:2',
        restaurantId: 'required|integer',
        lang: 'required|string',
        sourceId: 'required|integer',
      });
      await Validate(req, {
        file: 'mime:jpg,png,gif',
      });

      const {
        id, name, restaurantId, lang, sourceId, restBranchId, image,
      } = req.body;

      const categories = await Categories.findOne({
        where: {
          sourceId,
          lang,
        },
      });

      if (_.isEmpty(categories)) {
        const parentCategory = await Categories.findOne({
          where: {
            id: sourceId,
            sourceId,
          },
        });

        if (!_.isEmpty(parentCategory)) {
          const newCategory = await Categories.create({
            name,
            restaurantId,
            lang,
            sourceId,
            restBranchId,
          });

          if (!_.isEmpty(req.file)) {
            const img = req.file;
            const fileTypes = {
              'image/jpeg': '.jpg',
              'image/png': '.png',
              'image/gif': '.gif',
            };

            const imageDir = `public/images/categories/${newCategory.id}/`;

            if (!fs.existsSync(imageDir)) {
              fs.mkdirSync(imageDir, { recursive: true });
            }
            const images = `${img.fieldname}-${Date.now()}${fileTypes[img.mimetype]}`;
            const imageFileName = `${global.serverUrl}/images/categories/${newCategory.id}/${images}`;
            await sharp(img.buffer)
              .resize(300, 300, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255 },
              })
              .toFile(imageDir + images);
            newCategory.image = imageFileName;
            await newCategory.save();
          } else {
            newCategory.image = image;
            await newCategory.save();
          }

          res.json({
            status: 'Created',
            result: newCategory,
          });
          return;
        }
        throw HttpError(403, { errors: { status: 'Ignore' } });
      }

      let images;
      let imageFileName;
      if (!_.isEmpty(req.file)) {
        const img = req.file;
        const removeDir = `public/images/categories/${id}/`;
        if (fs.existsSync(removeDir)) {
          fs.rmdirSync(removeDir, { recursive: true });
        }

        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/gif': '.gif',
        };

        const newDir = `public/images/categories/${id}/`;
        if (!fs.existsSync(newDir)) {
          fs.mkdirSync(newDir, { recursive: true });
        }
        images = `${img.fieldname}-${Date.now()}${fileTypes[img.mimetype]}`;
        await sharp(img.buffer)
          .resize(300, 300, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255 },
          })
          .toFile(newDir + images);
        imageFileName = `${global.serverUrl}/images/categories/${id}/${images}`;
        const category = await Categories.update({
          name,
          restaurantId,
          lang,
          sourceId,
          image: imageFileName,
          restBranchId,
        }, {
          where: {
            $or: {
              id,
              sourceId,
            },
            lang,
          },
        });

        res.json({
          status: 'ok',
          msg: 'Updated',
          result: category,
        });
        return;
      }
      const category = await Categories.update({
        name,
        restaurantId,
        lang,
        sourceId,
        image,
        restBranchId,
      }, {
        where: {
          $or: {
            id,
            sourceId,
          },
          lang,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: category,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateAvailable = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        sourceId: 'required|integer',
        restaurantId: 'required|integer',
        available: 'required|boolean',
      });

      const {
        id, sourceId, available, restaurantId,
      } = req.body;

      const categoryLang = await Categories.findAll({ where: { sourceId, id, restaurantId } });

      const availUpdate = await Promise.map(categoryLang, (val) => Categories.update({
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

  static deleteCategories = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });

      const { id } = req.params;

      const image = await Categories.findByPk(id);

      const count = await Categories.findAll({
        where: {
          image: image.image,
          id: { $ne: id },
        },
      });

      await Categories.destroy({
        where: {
          id,
        },
      });

      if (_.isEmpty(count)) {
        const imageDir = `public/images/categories/${id}/`;
        if (fs.existsSync(imageDir)) {
          fs.rmdirSync(imageDir, { recursive: true });
        }
      }

      res.json({
        status: 'ok',
        msg: 'Deleted',
      });
    } catch (e) {
      next(e);
    }
  }
}

export default CategoriesController;
