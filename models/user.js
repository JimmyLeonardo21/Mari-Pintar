'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Course)
      User.hasOne(models.Profile)
    }
  };
  User.init({
    username:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Please enter your e-mail'
        },
        // isEmail:{
        //   msg:'Must be an e-mail.'
        // }
      }
    },

    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Please enter a password'
        },
        len: [5,15]
      }
    },
    CourseId: DataTypes.INTEGER,

    Role: DataTypes.STRING,

    
  },
    
   {
    hooks: {
      beforeCreate(instance, options){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
        let role = "newbie"
        instance.Role = role
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};