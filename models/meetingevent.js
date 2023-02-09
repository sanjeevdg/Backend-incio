const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const MeetingEvent = sequelize.define('meetingevents', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
      mname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      start: {
      type: Sequelize.DATE,
      allowNull: false,
   },
	  end: {
      type: Sequelize.DATE,
      allowNull: false,
   },
      place: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      people: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  description: {
	     type: Sequelize.TEXT,
      allowNull: true,
 

},
   
});


module.exports = MeetingEvent;
