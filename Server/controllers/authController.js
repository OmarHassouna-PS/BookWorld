const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/500");

const createToken = (req, res) => {

  const accessToken = jwt.sign(
    JSON.parse(JSON.stringify({ userId: req.user._id, email: req.user.email })),
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1w" }
  );

  res.json({ Token: accessToken, data: req.user })
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user || !(await bcrypt.compare(password, user.password)) || user.is_delete) {

      return res.status(401).send("incorrect email or password");
    }
    req.user = user;
    next();

  } catch (error) {
    errorHandler(error, req, res);
  }
};


module.exports = {
  loginUser,
  createToken,
}; 