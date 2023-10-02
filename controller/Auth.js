const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res
      .status(201)
      .json({
        id: user.id,
        orders: user.orders,
        addresses: user.addresses,
        name: user.name,
        role: user.role,
        email: user.email,
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: "No such email found." });
    }
    if (user.password === req.body.password) {
      res.status(201).json({
        id: user.id,
        orders: user.orders,
        addresses: user.addresses,
        name: user.name,
        role: user.role,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
