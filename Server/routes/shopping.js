const shoppingController = require("../controllers/ShoppingController");

const Router = require("koa-router");
const router = new Router();
router.prefix("/shopping");

router.post("/update/:id", shoppingController.updateAddress);
router.get("/:id", shoppingController.getDetail);
module.exports = router;
