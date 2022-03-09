const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const { STRING, UUID, UUIDV4, BOOLEAN, TEXT } = Sequelize;
const id = {
  type: UUID,
  defaultValue: UUIDV4,
  primaryKey: true,
};

const User = db.define("user", {
  id,
  first_name: {
    type: STRING,
    allowNull: false,
  },
  last_name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },

  address: {
    type: STRING,
    allowNull: true,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

/**
 * hooks
 */

User.addHook("beforeSave", async function (user) {
  if (user._changed.has("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
});

User.byToken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (user) {
      return user;
    }
    const error = Error("bad credentials - in byToken - on try");
    error.status = 401;
    throw error;
  } catch (err) {
    console.log("REEEEED", err);
    const error = Error("bad credentials - in byToken on catch");
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT, {
        expiresIn: 30 * 60,
      });
      return token;
    }
    const error = Error("bad credentials - in authenticate - try");
    error.status = 401;
    return error;
  } catch (err) {
    console.log("REEED", err);
    const error = Error("bad credentials - in authenticate - catch");
    error.status = 401;
    return error;
  }
};

/**
 * instanceMethods
 */
// User.prototype.correctPassword = function (candidatePwd) {
//   //we need to compare the plain version to an encrypted version of the password
//   return bcrypt.compare(candidatePwd, this.password);
// };

// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, process.env.JWT);
// };

/**
 * classMethods
 */
// User.authenticate = async ({ email, password }) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign({ id: user.id }, process.env.JWT, {
//         expiresIn: 30 * 60,
//       });
//       return token;
//     }
//     const error = Error("bad credentials - in authenticate - try");
//     error.status = 401;
//     throw error;
//   } catch (err) {
//     console.log("REEED", err);
//     const error = Error("bad credentials - in authenticate - catch");
//     error.status = 401;
//     throw error;
//   }
// };

// const hashPassword = (user) => {
//   User.addHook("beforeSave", async function (user) {
//     if (user._changed.has("password")) {
//       user.password = await bcrypt.hash(user.password, 10);
//     }
//   });
// };

// User.beforeCreate(hashPassword);
// User.beforeUpdate(hashPassword);
// User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
module.exports = User;
