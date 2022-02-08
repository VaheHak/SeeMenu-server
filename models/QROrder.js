import { Model, DataTypes } from 'sequelize';
import db from '../services/db';
import Restaurant from './Restaurant';

class QROrder extends Model {

}

QROrder.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  tables: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      const tables = this.getDataValue('tables');
      return typeof tables === 'string' ? JSON.parse(tables) : tables;
    },
  },
  template: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  styles: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      const styles = this.getDataValue('styles');
      return typeof styles === 'string' ? JSON.parse(styles) : styles;
    },
  },
}, {
  sequelize: db,
  tableName: 'qr_order',
  modelName: 'qr_order',
});

QROrder.belongsTo(Restaurant, {
  foreignKey: 'restaurantQrId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'qrOrderRest',
});
Restaurant.hasMany(QROrder, {
  foreignKey: 'restaurantQrId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'restQrOrder',
});

export default QROrder;
