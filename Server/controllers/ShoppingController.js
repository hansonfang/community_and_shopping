const ShoppingModel = require("../models/ShoppingModel");

/**
 *
 *
 * @class ShoppingController
 */

class ShoppingController {
  /**
   *
   *
   * @static
   * @param {*} ctx
   * @memberof ShoppingController
   */
  static async updateAddress(ctx) {
    try {
      const {
        name,
        phone,
        address,
        zip,
        province,
        city,
        district
      } = ctx.request.body;

      console.log(ctx.request.body);
      const res = await ShoppingModel.updateAddress(ctx.params.id, {
        username: name,
        phone,
        address,
        zip,
        province,
        city,
        district
      });

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新地址成功",
        data: res
      };
    } catch (error) {
      console.error(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新地址失败",
        data: error
      };
    }
  }

  static async getDetail(ctx) {
    try {
      const res = await ShoppingModel.detail(ctx.params.id);
      console.log(res);
      ctx.body = {
        code: 200,
        message: "获取地址详情成功",
        data: res
      };
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ShoppingController;
