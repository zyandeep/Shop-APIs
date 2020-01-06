const router = require("express").Router();
const multer = require("multer");

const checkAuth = require("../middleware/check-auth");
const Product = require("../models/Product");

// 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const re = /^image\/(jpeg|png|jpg)$/g;

  if (re.test(file.mimetype)) {
    cb(null, true);
  }
  else {
    const error = new Error("only jpeg/png/jpg images are accepted");
    error.status = 400;
    cb(error);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024
});


router.route("/")
  .get(async function (req, res, next) {

    try {
      docs = await Product.find({}, { __v: 0 });
      res.send(docs);
    }
    catch (error) {
      next(error);
    }

  })
  .post(checkAuth, upload.single("imgUrl"), async function (req, res, next) {

    console.log(req.file);

    try {
      const doc = await new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        imgUrl: req.file.path
      })
        .save();

      res.status(201).send(doc);
    }
    catch (error) {
      error.status = 400;
      next(error);
    }

  });


function sendResult(doc, req, res, next) {
  if (doc) {
    return res.send(doc);
  }

  const error = new Error("no document found.");
  error.status = 404;
  next(error);
}


router.route("/:id")
  .get(async function (req, res, next) {

    try {
      const doc = await Product.findById(req.params.id);

      sendResult(doc, req, res, next);
    }
    catch (error) {
      next(error);
    }

  })
  .patch(checkAuth, async function (req, res, next) {

    try {
      const doc = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });

      sendResult(doc, req, res, next);
    }
    catch (error) {
      next(error);
    }

  })
  .delete(checkAuth, async function (req, res, next) {

    try {
      const doc = await Product.findOneAndDelete({ _id: req.params.id })

      sendResult(doc, req, res, next);
    }
    catch (error) {
      next(error);
    }

  });

module.exports = router;
