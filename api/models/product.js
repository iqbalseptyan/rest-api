const Sequelize = require("sequelize");
const db = require("../config/config");

const Product = db.define(
  "product",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    productImage: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Product;
