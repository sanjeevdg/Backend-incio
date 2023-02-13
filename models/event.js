const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const Event = sequelize.define('events', {
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
      location: {
      type: Sequelize.STRING,
      allowNull: true,
   },
	  description: {
      type: Sequelize.STRING,
      allowNull: true,
   },
      uniquelink: {
      type: Sequelize.TEXT,
      allowNull: true,
   },
      mstart: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  duration: {
	     type: Sequelize.STRING,
      allowNull: true,
   },
      people: {
      type: Sequelize.STRING,
      allowNull: true,
   },
      

   
});


module.exports = Event;
