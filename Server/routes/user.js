const Router = require("koa-router");
const router = new Router();
router.prefix("/user");

router.get("/test", ctx => {
  ctx.body = "get user test";
});
module.exports = router;