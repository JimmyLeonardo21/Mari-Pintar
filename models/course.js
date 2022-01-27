'use strict';
const {
  Model
} = require('sequelize');
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
    static dateFormat(instance){
      let dt2 = new Date()
      var diff =(dt2.getTime() - instance.createdDate.getTime()) / 1000;
      diff /= (60 * 60);
      return Math.abs(Math.round(diff))
     
    }
    getMinutes(){
      let duration = `${this.duration} minutes`
      return duration
    }
    static getLength(input){

    }
  };
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    videoUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};