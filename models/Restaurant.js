import { Model, DataTypes } from 'sequelize';
import db from '../services/db';
import Users from './Users';

class Restaurant extends Model {

}

Restaurant.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timing: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const logo = this.getDataValue('logo');
      if (logo !== undefined) {
        return logo;
      }
      return undefined;
    },
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const cover = this.getDataValue('cover');
      if (cover !== undefined) {
        return cover;
      }
      return undefined;
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '0.0.0.0',
    get() {
      return undefined;
    },
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return undefined;
    },
  },
  lon: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return undefined;
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return undefined;
    },
  },
}, {
  sequelize: db,
  tableName: 'restaurant',
  modelName: 'restaurant',
});

Restaurant.belongsTo(Users, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'usersRest',
});
Users.hasMany(Restaurant, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'restaurants',
});

Restaurant.belongsTo(Users, {
  targetKey: 'id',
  foreignKey: {
    name: 'restManagerId',
    allowNull: true,
  },
  onUpdate: 'set null',
  onDelete: 'set null',
  as: 'restManager',
});
Users.hasMany(Restaurant, {
  targetKey: 'id',
  foreignKey: {
    name: 'restManagerId',
    allowNull: true,
  },
  onUpdate: 'set null',
  onDelete: 'set null',
  as: 'managerRest',
});

Restaurant.belongsTo(Restaurant, {
  targetKey: 'id',
  foreignKey: {
    name: 'branchId',
    allowNull: true,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'branches',
});
Restaurant.hasMany(Restaurant, {
  targetKey: 'id',
  foreignKey: {
    name: 'branchId',
    allowNull: true,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'restBranches',
});

export default Restaurant;
