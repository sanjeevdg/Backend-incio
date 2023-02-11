const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const Client = sequelize.define('clients', {
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
      email: {
      type: Sequelize.DATE,
      allowNull: false,
   },
	  zip: {
      type: Sequelize.DATE,
      allowNull: false,
   },
      address: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      phone: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  country: {
	     type: Sequelize.TEXT,
      allowNull: true,
   },
      cname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      cemail: {
      type: Sequelize.DATE,
      allowNull: false,
   },
	  czip: {
      type: Sequelize.DATE,
      allowNull: false,
   },
      caddress: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      cphone: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  ccountry: {
	     type: Sequelize.TEXT,
      allowNull: true,
},


   
});


module.exports = Client;
