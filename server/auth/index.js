const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const Order = require("../db/models/Order");
module.exports = router;

router.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.put("/api/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/api/add/auth", async (req, res, next) => {
  try {
    const auth = await { ...req.body };
    const user = await User.create(auth);
    const newOrder = await Order.create();
    await user.addOrder(newOrder);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/api/auth", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.get("/api/me", async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization));
  } catch (err) {
    next(err);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(req);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = router;
