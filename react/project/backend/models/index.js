'use strict';

const fs = require('fs'); 
const path = require('path'); 
const Sequelize = require('sequelize'); 
const process = require('process');
const basename = path.basename(__filename);
console.log(basename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname) // __direname : models 
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  }) // [post.js, user.js]
  .forEach(file => { // 1. user.js  -> models/user.js 2. post.js -> models/post.js
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    // db['User'] = User
    // db['Post'] = Post
  });
// ['User','Post']
Object.keys(db).forEach(modelName => { // 1. User, 2.Post
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
