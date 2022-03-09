const { db } = require("./db");
const PORT = process.env.PORT || 8000;
const app = require("./app");
const seed = require("../script/seed");

if (process.env.NODE_ENV === !"production") {
  require("dotenv").load();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// console.log(stripeSecretKey);
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// console.log(stripePublicKey);

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
