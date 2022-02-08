import { Model, DataTypes } from 'sequelize';
import db from '../services/db';

import Users from './Users';
import OrderLiner from './OrderLiner';

class Order extends Model {
}

Order.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  tableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  sequelize: db,
  tableName: 'order',
  modelName: 'order',
});

Order.belongsTo(Users, {
  targetKey: 'id',
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'orderAuthor',
});

Users.hasMany(Order, {
  targetKey: 'id',
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'userOrders',
});

Order.hasMany(OrderLiner, {
  targetKey: 'id',
  foreignKey: 'orderId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'orderLiners',
});

OrderLiner.belongsTo(Order, {
  targetKey: 'id',
  foreignKey: 'orderId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'orderInfo',
});

export default Order;
