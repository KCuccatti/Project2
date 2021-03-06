"use strict";
var dotenv = require('dotenv').config()
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
console.log("The Environment is: " + env);
var config = require(__dirname + '/../config/config.js')[env];
var db = {};

if (env==="production") {
  console.log("Using PROD STUFF");
  //var sequelize = new Sequelize(process.env[config.use_env_variable]);
  //var sequelize = new Sequelize(config.process.env[config.use_env_variable]);
  console.log("Using Environment Variables");
  console.log("User Name: " + process.env.MYSQL_PROD_USER);
  console.log("Database: " + process.env.MYSQL_PROD_DBNAME);
  console.log("Host: " + process.env.MYSQL_PROD_HOST);
  console.log("THE DATABSE: " + config.database);
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
} else {
  console.log("Using Environment Variables");
  console.log("User Name: " + process.env.MYSQL_DEV_USER);
  console.log("Database: " + process.env.MYSQL_DEV_DBNAME);
  console.log("Host: " + process.env.MYSQL_DEV_HOST);
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
