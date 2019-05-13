const AdminModel = require("../models/AdminModel");
const CommunityModel = require("../models/CommunityModel");

class AdminController {
  static async getUser(ctx) {
    try {
      const res = await AdminModel.getUserByID(ctx.params.id);
      console.log("success", res);
    } catch (error) {
      console.log(error);
    }
  }
  static async login(ctx) {}

  static async createProperty(ctx) {
    ctx.response.status = 500;
    ctx.body = {
      code: 500,
      message: "不能创建"
    };
  }

  static async getAllCommunitys(ctx) {
    try {
      const res = await CommunityModel.findCommunityList();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询社区列表成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询社区列表失败",
        data: error.toString()
      };
    }
  }
}

module.exports = AdminController;
