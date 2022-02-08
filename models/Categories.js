import { Model, DataTypes } from 'sequelize';
import db from '../services/db';
import Restaurant from './Restaurant';

class Categories extends Model {

}

Categories.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const image = this.getDataValue('image');
      if (image !== undefined) {
        return image;
      }
      return undefined;
    },
  },
  lang: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en',
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize: db,
  tableName: 'categories',
  modelName: 'categories',
});

Categories.belongsTo(Restaurant, {
  targetKey: 'id',
  foreignKey: 'restaurantId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'restCategories',
});

Restaurant.hasMany(Categories, {
  targetKey: 'id',
  foreignKey: 'restaurantId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'categoriesRest',
});

Categories.belongsTo(Restaurant, {
  targetKey: 'branchId',
  foreignKey: 'restBranchId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'restBranchCategories',
});

Restaurant.hasMany(Categories, {
  targetKey: 'branchId',
  foreignKey: 'restBranchId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'categoriesRestBranch',
});

Categories.belongsTo(Categories, {
  targetKey: 'id',
  foreignKey: 'sourceId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'catLanguages',
});
Categories.hasMany(Categories, {
  targetKey: 'id',
  foreignKey: 'sourceId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'languages',
});

export default Categories;
