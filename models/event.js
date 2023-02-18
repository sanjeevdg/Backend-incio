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
      type: Sequelize.DATE,
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
   rptmon: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   },   
rpttue: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   },
   rptwed: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   },
   rptthu: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   },
   rptfri: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   },
   rptsat: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   },
   rptsun: {
      type:Sequelize.BOOLEAN,
      defaultValue:false
   }
});


module.exports = Event;
