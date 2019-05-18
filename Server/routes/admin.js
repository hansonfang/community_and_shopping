const Router = require("koa-router");
const router = new Router();
const AdminController = require("../controllers/AdminController");
const AnnouncementsController = require("../controllers/AnnouncementsController");
const NewsController = require("../controllers/NewsController");
const ShopController = require("../controllers/ShopController");
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

//商店
router.get("/shop/getCategory", ShopController.getCategory);
router.get("/shop/getGoodsList/:cateID", ShopController.getGoodsList);
router.get("/shop/getGoodsDetail/:id", ShopController.getGoodsDetail);
router.get("/shop/getCarousels/:id", ShopController.getCarousels);

router.delete("/shop/deleteGoods", ShopController.deleteGoods);

router.post("/shop/uploadMainImage", ShopController.uploadMainImage);
router.post("/shop/uploadSubImage", ShopController.uploadSubImage);
router.post("/shop/addSkuID", ShopController.addSkuID);
router.post("/shop/updateSku", ShopController.updateSku);
router.post("/shop/updateSubImage", ShopController.updateSubImage);
router.post("/shop/editSubImage", ShopController.editSubImage);
router.post("/shop/updateGoods", ShopController.updateGoods);
router.post("/shop/uploadCarouselImage", ShopController.uploadCarouselImage);
router.post("/shop/updateKeyword", ShopController.updateKeyword);

router.put("/shop/createGoods", ShopController.createGoods);

router.delete("/shop/deleteSku", ShopController.deleteSku);
router.delete("/shop/deleteComment", ShopController.deleteComment);

module.exports = router;
