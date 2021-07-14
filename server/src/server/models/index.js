'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/postgresConfig.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


db['Categories'].hasMany(db['Products'],
    {foreignKey: 'categoryId', sourceKey: 'id'});

db['Characteristics'].hasMany(db['Product_characteristics'],
    {foreignKey: 'characteristicId', sourceKey: 'id'});
db['Characteristics'].belongsTo(db['Measures'],
    {foreignKey: 'measureId', sourceKey: 'id'});

db['Firms'].hasMany(db['Products'],
    {foreignKey: 'firmId', sourceKey: 'id'});

db['Orders'].hasMany(db['Order_products'],
    {foreignKey: 'orderId', sourceKey: 'id'});

db['Order_products'].belongsTo(db['Products'],
    {foreignKey: 'productId', sourceKey: 'id'});
db['Order_products'].belongsTo(db['Orders'],
    {foreignKey: 'orderId', sourceKey: 'id'});

db['Products'].belongsTo(db['Categories'],
    {foreignKey: 'categoryId', sourceKey: 'id'});
db['Products'].belongsTo(db['Firms'],
    {foreignKey: 'firmId', sourceKey: 'id'});
db['Products'].hasMany(db['Product_characteristics'],
    {foreignKey: 'productId', sourceKey: 'id'});
db['Products'].hasMany(db['Order_products'],
    {foreignKey: 'productId', sourceKey: 'id'});

db['Product_characteristics'].belongsTo(db['Characteristics'],
    {foreignKey: 'characteristicId', sourceKey: 'id'});
db['Product_characteristics'].belongsTo(db['Products'],
    {foreignKey: 'productId', sourceKey: 'id'});

db['Measures'].hasMany(db['Characteristics'],
    {foreignKey: 'measureId', sourceKey:'id'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
