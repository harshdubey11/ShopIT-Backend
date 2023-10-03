const { Order } = require("../model/Order");

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);

  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchOrdersbyUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};


exports.fetchAllOrders = async (req, res) => {
  //two same queries : as one executes for getting count.
  let query = Order.find({deleted:{$ne:true}});
  let totalOrdersQuery = Order.find({deleted:{$ne:true}});
  //order of 'if' ladder matters here.
 
  //TODO : How to get sort on discounted Price not on Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};