const { sequelize } = require('../config/db');
const { DataTypes } = require("sequelize");

const Users = sequelize.define(

    "users",
    {
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
        }
    },
    {
        timestamps: false,
    }
);

module.exports = Users;