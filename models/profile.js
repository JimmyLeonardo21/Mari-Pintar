'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  };
  Profile.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Please enter your name.'
        },
      
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Please enter your e-mail.'
        },
        isEmail:{
          msg:'Must be an e-mail.'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Please enter your gender.'
        }
        
      }
    },
    address: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Please enter your address.'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};