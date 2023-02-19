const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const User = sequelize.define('users', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
      name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      fireb_uid: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	 email  : {
      type: Sequelize.STRING,
      allowNull: false,
   },
   prof_image  : {
      type: Sequelize.STRING,
      allowNull: true,
   },   
   password  : {
      type: Sequelize.STRING,
      allowNull: false,
   },
   regtoken: {
      type: Sequelize.STRING,
      allowNull:true,
   }
   
});


module.exports = User
