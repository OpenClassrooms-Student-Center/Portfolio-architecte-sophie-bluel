const dbConfig = require("./../config/db.config.js");
const {Sequelize}  = require("sequelize");
const config = require("../config/db.config");

const sequelize = new Sequelize('project6-db', 'user', 'pass', config)

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users.model.js')(sequelize, Sequelize);
db.works = require('./works.model.js')(sequelize, Sequelize);
db.categories = require('./categories.model.js')(sequelize, Sequelize);

// Works and Categories Relationships
db.categories.hasMany(db.works, {as: "works"})
db.works.belongsTo(db.categories, {
	foreignKey: 'categoryId',
	as: 'category'
});

// Works and Users Relationships
db.users.hasMany(db.works, {as: "works"})
db.works.belongsTo(db.users, {
	foreignKey: 'userId',
	as: 'user'
});

module.exports = db;
