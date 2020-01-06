const Order = require("../models/Order");


async function getAllOrders(req, res, next) {
  try {
    // const docs = await Order.find({}, { __v: 0 });
    // const products = await Promise.all(
    //   docs.map(doc => {
    //     return Order.populate(doc.products, { path: "product", model: "Product", select: "name price" })
    //   })
    // );
    // for (let i = 0; i < docs.length; i++) {
    //   docs[i].products = products[i];
    // }

    const docs = await Order.find({}, { __v: 0 }).populate({
      path: "products.product",
      select: "name price",
      model: "Product"
    })
      .sort({ createdAt: -1 });

    res.send(docs);
  }
  catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  console.log(req.body);

  try {
    const doc = await new Order({
      products: req.body.products
    })
      .save();

    res.status(201).send(doc);
  }
  catch (error) {
    error.status = 400;
    next(error);
  }

}

async function deleteOrder(req, res, next) {
  try {
    const doc = await Order.findOneAndDelete({ _id: req.params.id })

    if (doc) {
      return res.send(doc);
    }

    const error = new Error("no document found.");
    error.status = 404;
    next(error);
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  deleteOrder
}
