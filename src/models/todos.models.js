const db = require("../utils/database")
const {DataTypes} = require("sequelize")

// Define the model
const Todos = db.define(
    "todos", 
    {
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
     },
     title: {
        type: DataTypes.STRING(100),
        allowNull: false,
     },
     description: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
     },
    })

    module.exports = Todos