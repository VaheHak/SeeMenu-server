import { Model, DataTypes } from 'sequelize';
import db from '../services/db';

class OrderLiner extends Model {
}

OrderLiner.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: db,
  tableName: 'orderLiner',
  modelName: 'orderLiner',
});

export default OrderLiner;
