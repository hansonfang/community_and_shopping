const Router = require("koa-router");
const router = new Router();
const AdminController = require("../controllers/AdminController");
const AnnouncementsController = require("../controllers/AnnouncementsController");
const NewsController = require("../controllers/NewsController");
router.prefix("/admin");

router.get("/user/:id", AdminController.getUser);
router.post("/login", AdminController.login);

router.post("/property", AdminController.createProperty);
router.get("/communitylist", AdminController.getAllCommunitys);

// 公告
router.get("/announcements/community/:id", AnnouncementsController.getAnnouncements);
router.get("/announcements/property", AnnouncementsController.getPropertyAnnouncements);

router.delete("/announcements/delete", AnnouncementsController.deleteAnnouncements);
router.delete("/announcements/property/delete", AnnouncementsController.deletePropertyAnnouncements);

router.post("/announcements/create", AnnouncementsController.createAnnouncement);
router.post("/announcements/property/create", AnnouncementsController.createPropertyAnnouncement);

router.post("/announcements/update", AnnouncementsController.updateAnnouncement);
router.post("/announcements/property/update", AnnouncementsController.updatePropertyAnnouncement);

//新闻
router.get("/news/getAll/:id", NewsController.getAllNews);
router.get("/news/getNewsDetail/:id", NewsController.getNewsDetail);

router.delete("/news/delete", NewsController.deleteNews);

router.post("/news/image/headline", NewsController.postImage);
router.post("/news/image/section", NewsController.postSectionImage);

router.post("/news/update", NewsController.updateContent);
router.put("/news/createNews", NewsController.createNews);
router.put("/news/addsection", NewsController.addSection);

module.exports = router;
