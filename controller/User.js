const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    res.status(200).json({
      id: user.id,
      orders: user.orders,
      addresses: user.addresses,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json(err);
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
