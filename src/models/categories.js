const { sequelize } = require('../config/db');
const { DataTypes } = require("sequelize");
const Products = require('./products');

const Categories = sequelize.define(

  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Categories.hasMany(Products, {
  foreinkey: "categoryId",
  sourceKey: "id",
});
Products.belongsTo(Categories, { foreinkey: "categoryId", targetId: "id" });

module.exports = Categories;