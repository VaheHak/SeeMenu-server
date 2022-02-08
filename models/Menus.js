import { Model, DataTypes } from 'sequelize';
import db from '../services/db';
import Restaurant from './Restaurant';
import Categories from './Categories';

const sequelizePaginate = require('sequelize-paginate');

class Menus extends Model {

}

Menus.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  vegan: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.JSON,
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'en',
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  types: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  sequelize: db,
  tableName: 'menus',
  modelName: 'menus',
});

Menus.belongsTo(Restaurant, {
  targetKey: 'id',
  foreignKey: 'restaurantId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'menusRestaurant',
});
Restaurant.hasMany(Menus, {
  targetKey: 'id',
  foreignKey: 'restaurantId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'menus',
});

Menus.belongsTo(Restaurant, {
  targetKey: 'branchId',
  foreignKey: 'restaurantBranchId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'menusRestaurantBranch',
});
Restaurant.hasMany(Menus, {
  targetKey: 'branchId',
  foreignKey: 'restaurantBranchId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'BranchMenus',
});

Menus.belongsTo(Categories, {
  foreignKey: 'categoryId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'menusCategory',
});
Categories.hasMany(Menus, {
  foreignKey: 'categoryId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'catMenus',
});
Menus.belongsTo(Menus, {
  targetKey: 'id',
  foreignKey: 'sourceId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'menusLanguages',
});
Menus.hasMany(Menus, {
  targetKey: 'id',
  foreignKey: 'sourceId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'languages',
});
sequelizePaginate.paginate(Menus);

export default Menus;
