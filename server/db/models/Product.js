const Sequelize = require("sequelize");
const db = require("../db");

const { STRING, UUID, UUIDV4, INTEGER, TEXT, BOOLEAN } = Sequelize;
const id = {
  type: UUID,
  defaultValue: UUIDV4,
  primaryKey: true,
};

const Product = db.define("product", {
  id,
  name: {
    type: STRING,
    allowNull: false,
  },
  imageURL: {
    type: TEXT,
    validate: {
      isUrl: true,
    },
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
  inventory: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: true,
  },
  description: {
    type: TEXT,
  },
  category: {
    type: STRING,
    allowNull: false,
  },
  // URL: {
  //   type: STRING,
  //   allowNull: false,
  // },
});

module.exports = Product;
