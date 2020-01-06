const router = require("express").Router();

const controller = require("../controllers/order_controller");
const checkAuth = require("../middleware/check-auth");

// Verify JWT
router.use(checkAuth);

router.route("/")
  .get(controller.getAllOrders)
  .post(controller.createOrder);


router.route("/:id")
  .get(async function (req, res, next) {
    res.send({ message: `GET requests for ${req.params.id}` });

  })
  .delete(controller.deleteOrder);

module.exports = router;
