const {DataTypes} = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  directions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cookTime: {
    type: DataTypes.STRING,
    allowNull: false
  },
  servingSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
      type: DataTypes.STRING,
      allowNull: false
  // category determines whether it is a breakfast, lunch, or dinner food.
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

module.exports = Recipe;