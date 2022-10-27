const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Todo = sequelize.define("Todo", {
	id: {
		// type: DataTypes.UUID,
		// defaultValue: DataTypes.UUIDV4,
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	done: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Todo;
