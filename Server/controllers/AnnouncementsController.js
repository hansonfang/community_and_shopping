const AnnouncementsModel = require("../models/AnnouncementsModel");
const PropertyAnnouncementsModel = require("../models/PropertyAnnouncementsModel");

class AnnouncementsController {
  static async getAnnouncements(ctx) {
    const { id } = ctx.params;
    try {
      const res = await AnnouncementsModel.getAnnoucesByCommunityID(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询社区公告成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log("查询社区公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询社区公告失败",
        data: error
      };
    }
  }
  static async getPropertyAnnouncements(ctx) {
    try {
      const res = await PropertyAnnouncementsModel.getPropertyAnnouncements();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询物业公告成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log("查询物业公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询物业公告失败",
        data: error
      };
    }
  }
  static async createAnnouncement(ctx) {
    const data = ctx.request.body;
    try {
      const res = await AnnouncementsModel.createAnnouncement(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "创建社区公告成功",
        data: res
      };
    } catch (error) {
      console.log("创建社区公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "创建社区公告失败",
        data: error
      };
    }
  }
  static async createPropertyAnnouncement(ctx) {
    const data = ctx.request.body;
    try {
      const res = await PropertyAnnouncementsModel.createAnnouncement(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "创建物业公告成功",
        data: res
      };
    } catch (error) {
      console.log("创建物业公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "创建物业公告失败",
        data: error
      };
    }
  }
  static async deleteAnnouncements(ctx) {
    const data = ctx.request.body;
    const communityIDs = data.id;
    try {
      const res = await AnnouncementsModel.delete(communityIDs);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除社区公告成功",
        data: res
      };
    } catch (error) {
      console.log("删除社区公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "删除社区公告失败",
        data: error
      };
    }
  }
  static async deletePropertyAnnouncements(ctx) {
    const data = ctx.request.body;
    const communityIDs = data.id;
    try {
      const res = await PropertyAnnouncementsModel.delete(communityIDs);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除物业公告成功",
        data: res
      };
    } catch (error) {
      console.log("删除物业公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "删除物业公告失败",
        data: error
      };
    }
  }
  static async updateAnnouncement(ctx) {
    const data = ctx.request.body;
    try {
      const res = await AnnouncementsModel.update(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新社区公告成功",
        data: res
      };
    } catch (error) {
      console.log("更新社区公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新社区公告失败",
        data: error
      };
    }
  }
  static async updatePropertyAnnouncement(ctx) {
    const data = ctx.request.body;
    try {
      const res = await PropertyAnnouncementsModel.update(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新物业公告成功",
        data: res
      };
    } catch (error) {
      console.log("更新物业公告失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新物业公告失败",
        data: error
      };
    }
  }
}

module.exports = AnnouncementsController;
