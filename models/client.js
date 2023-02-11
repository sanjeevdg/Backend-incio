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
      type: Sequelize.STRING,
      allowNull: false,
   },
	  zip: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      address: {
      type: Sequelize.TEXT,
      allowNull: false,
   },
      phone: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  country: {
	     type: Sequelize.STRING,
      allowNull: true,
   },
      cname: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      cemail: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  czip: {
      type: Sequelize.STRING,
      allowNull: false,
   },
      caddress: {
      type: Sequelize.TEXT,
      allowNull: false,
   },
      cphone: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	  ccountry: {
	     type: Sequelize.STRING,
      allowNull: true,
},


   
});


module.exports = Client;
