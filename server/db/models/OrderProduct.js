const Sequelize = require("sequelize");
const db = require("../db");
const { INTEGER } = Sequelize;

const OrderProduct = db.define("orderproduct", {
  itemCount: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = OrderProduct;
