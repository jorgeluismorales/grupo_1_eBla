const { sequelize } = require('../config/db');
const { DataTypes } = require("sequelize");
const Products = require('./products');

const Users = sequelize.define(

    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(['admin', 'user']),
            defaultValue: 'user',
        },
        detail: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: false,
    }
);

Users.belongsToMany(Products, { through: "products_users" });
Products.belongsToMany(Users, { through: "products_users" });

module.exports = Users;

