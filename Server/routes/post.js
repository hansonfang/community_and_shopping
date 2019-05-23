const Router = require("koa-router");
const router = new Router();
const VoteController = require("../controllers/VoteController");
router.prefix("/vote");

router.get("/all", VoteController.getVoteList);
router.get("/:id", VoteController.getVoteDetail);

router.post("/:id", VoteController.postVote);
module.exports = router;
