'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.setting, { foreignKey: "userId", onDelete: "cascade" })
      user.hasMany(models.bot, { foreignKey: "userId", onDelete: "cascade" })
      user.hasMany(models.transaction, { foreignKey: "userId", onDelete: "cascade" })
    }
  }
  user.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    active: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER,
    token: DataTypes.STRING,
    token_expire: DataTypes.STRING,
    birthday: DataTypes.DATE,
    role: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    current: DataTypes.INTEGER,
    previous: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user',
  });

  user.isEmailTaken = async (email, excludeUserId) => {
    const user = await user.findOne({
      where: {
        email,
        userId: {
          [Op.ne]: excludeUserId
        }
      }
    });
    return user;
  }

  user.isPasswordMatch = async (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
  return user;
};