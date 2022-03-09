const isAdmin = async (req, res, next) => {
  const user = await req.user;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401).send("No Access To This Page");
  }
};

module.exports = { isAdmin };
