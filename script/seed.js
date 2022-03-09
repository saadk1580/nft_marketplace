"use strict";

const { default: axios } = require("axios");
const {
  db,
  models: { User, Product, Order, OrderProduct },
} = require("../server/db");

const data = require("./data");

Order.belongsTo(User);
User.hasMany(Order);
OrderProduct.belongsTo(Product);
OrderProduct.belongsTo(Order);
Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      first_name: "Daniel",
      last_name: "Cho",
      email: "daniel@gmail.com",
      password: "daniel_pw",
      isAdmin: true,
    }),
    User.create({
      first_name: "Ben",
      last_name: "Greenspan",
      email: "ben@gmail.com",
      password: "ben_pw",
      address: "1600 Pennsylvania Avenue",
      isAdmin: false,
    }),
    User.create({
      first_name: "Joe",
      last_name: "Collins",
      email: "joe@gmail.com",
      password: "joe_pw",
      address: "1060 W Addison St",
      isAdmin: false,
    }),
    User.create({
      first_name: "Saad",
      last_name: "Razzak",
      email: "saad@gmail.com",
      password: "saad_pw",
      isAdmin: true,
    }),
  ]);

  const testOrders = [
    {
      purchased: true,
      totalItems: 2,
      totalPrice: 450,
    },
    {
      purchased: true,
      totalItems: 2,
      totalPrice: 450,
    },
    {
      purchased: true,
      totalItems: 1,
      totalPrice: 199,
    },
    {
      purchased: true,
      totalItems: 4,
      totalPrice: 1000,
    },
    {
      purchased: true,
      totalItems: 5,
      totalPrice: 600,
    },
  ];

  const products = await Promise.all([
    data.azuki.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "Azuki",
        URL: "Azuki",
        inventory: product.inventory,
        price: product.price,
      })
    ),
    data.RTFKTCLONEXTM.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "Clone X",
        URL: "Clone_X",
        inventory: product.inventory,
        price: product.price,
      })
    ),
    data.tastyBones.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "Tasty Bones XYZ",
        URL: "Tasty_Bones",
        inventory: product.inventory,
        price: product.price,
      })
    ),
    data.metascapes.map((product) =>
      Product.create({
        name: product.name,
        inventory: product.inventory,
        imageURL: product.image_url,
        category: "The Metascapes",
        URL: "The_Metascapes",
        price: product.price,
      })
    ),
    data.cryptoPunks.map((product) =>
      Product.create({
        name: product.name,
        inventory: product.inventory,
        imageURL: product.image_url,
        category: "Crypto Punks",
        URL: "Crypto_Punks",
        price: product.price,
      })
    ),
    data.grumpets.map((product) =>
      Product.create({
        name: product.name,
        description: null,
        imageURL: product.image_url,
        category: "Grumpets",
        URL: "Grumpets",
        price: product.price,
        inventory: product.inventory,
      })
    ),
    data.littleLemonFriends.map((product) =>
      Product.create({
        name: product.name,
        inventory: product.inventory,
        imageURL: product.image_url,
        category: "Little Lemon Friends",
        URL: "Little_Lemon_Friends",
        price: product.price,
      })
    ),

    data.theLadies.map((product) =>
      Product.create({
        name: product.name,
        imageURL: product.image_url,
        category: "The Ladies",
        URL: "The_Ladies",
        price: product.price,
        inventory: product.inventory,
      })
    ),
  ]);

  await Promise.all(
    users.map(async (user) => {
      // await user.addOrder(
      //   await Order.create(testOrders[Math.floor(Math.random() * 5)])
      // );
      // await user.addOrder(
      //   await Order.create(testOrders[Math.floor(Math.random() * 5)])
      // );
      // await user.addOrder(
      //   await Order.create(testOrders[Math.floor(Math.random() * 5)])
      // );
      await user.addOrder(await Order.create());
    })
  );
  console.log(`seeded ${users.length} users`);

  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}
// console.log(`seeded ${products.length} products successfully`)

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
