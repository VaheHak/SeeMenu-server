import { Model, DataTypes } from 'sequelize';
import md5 from 'md5';
import db from '../services/db';

class Users extends Model {
  static passwordHash = (pass) => md5(md5(`${pass}_test`))
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'admin',
  },
  activation_code: {
    type: DataTypes.UUID,
    allowNull: true,
    unique: 'active_code',
    expires: 3600 * 1000,
    get() {
      return undefined;
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'email',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('password', Users.passwordHash(val));
    },
    get() {
      return undefined;
    },
  },
  user_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  two_factor_auth: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  email_code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  secret_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uniq_key: {
    type: DataTypes.UUID,
    allowNull: true,
    unique: 'uniq_key',
  },
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'users',
});

Users.belongsTo(Users, {
  targetKey: 'id',
  foreignKey: 'managerId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'managers',
});
Users.hasMany(Users, {
  targetKey: 'id',
  foreignKey: 'managerId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'users',
});

export default Users;
