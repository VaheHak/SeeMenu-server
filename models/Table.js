import { Model, DataTypes } from 'sequelize';
import db from '../services/db';
import Restaurant from './Restaurant';

class Table extends Model {

}

Table.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      const position = this.getDataValue('position');
      return typeof position === 'string' ? JSON.parse(position) : position;
    },
  },
}, {
  sequelize: db,
  tableName: 'table',
  modelName: 'table',
});

Table.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'tableRestaurant',
});
Restaurant.hasMany(Table, {
  foreignKey: 'restaurantId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'tables',
});

export default Table;
