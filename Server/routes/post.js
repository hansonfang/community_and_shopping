const Router = require("koa-router");
const router = new Router();
const VoteController = require("../controllers/VoteController");
router.prefix("/node/vote");

router.get("/all", VoteController.getVoteList);
router.get("/:id", VoteController.getVoteDetail);
module.exports = router;
