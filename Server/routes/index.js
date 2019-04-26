const Router = require("koa-router");
const VoteController = require("../controllers/VoteController");
const router = new Router({
  prefix: "/node"
});

router.get("/vote/all", VoteController.getVoteList);
router.get("/vote/:id", VoteController.getVoteDetail);

module.exports = router;
