const router = require("express").Router();
const {
  models: { User, Product, Order },
} = require("../db");

module.exports = router;

//route to GET all Users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//route to Search User by ID
router.get("/:id", async (req, res, next) => {
  try {
    res.send(
      await User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "first_name", "last_name", "email"],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

//route to GET an Order
router.get("/order/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        purchased: false,
      },
      include: {
        model: Product,
      },
    });
    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

//route to GET an Order History
router.get("/order/history/:id", async (req, res, next) => {
  try {
    const orderHistory = await Order.findAll({
      where: {
        userId: req.params.id,
        purchased: true,
      },
      include: {
        model: Product,
      },
    });
    res.send(orderHistory);
  } catch (ex) {
    next(ex);
  }
});

//route to UPDATE a User
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

//route to DELETE a User
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

//route to CHECKOUT and create new order
router.put("/order/checkout/:id", async (req, res, next) => {
  try {
    //find the order
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        purchased: false,
      },
    });

    //update the order to purchased
    await order.update({ purchased: true });

    //create new order for the user
    const newOrder = await Order.create();
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    await user.addOrder(newOrder);

    res.send(order);
  } catch (ex) {
    next(ex);
  }
});

router.use((err, req, res, next) => {
  res.status(500).send(err);
});
