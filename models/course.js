'use strict';
const {
  Model
} = require('sequelize');
const dayJs = require('dayjs')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)
      Course.hasMany(models.User)
    }
    static dateFormat(date) {
      return dayJs(date).format('DD MMM YYYY')
      // let dt2 = new Date()
      // var diff =(dt2.getTime() - instance.createdDate.getTime()) / 1000;
      // diff /= (60 * 60);
      // return Math.abs(Math.round(diff))

    }
    getMinutes() {
      let duration = `${this.duration} minutes`
      return duration
    }
    static getLength(input) {

    }
  };
  Course.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter course name.'
        }

      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter course description.'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please enter course duration.'
        }

      }
    },
    videoUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter course url.'
        }

      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please enter course category.'
        }

      }
    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};