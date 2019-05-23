const VoteModel = require("../models/VoteModel");

/**
 *
 *
 * @class VoteController
 */

class VoteController {
  /**
   *
   *
   * @static
   * @param {*} ctx
   * @memberof VoteController
   */
  static async getVoteList(ctx) {
    try {
      const res = [];
      (await VoteModel.getAllVoteList()).forEach(item => {
        res.push(item.toJSON());
      });
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询全部投票贴成功",
        data: res
      };
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询全部投票贴失败",
        data: error
      };
    }
  }

  static async getVoteDetail(ctx) {
    const { id } = ctx.params;
    try {
      const result = await VoteModel.getVoteDetail(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "成功查询投票贴详情",
        data: result.toJSON()
      };
    } catch (error) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询投票贴详情失败",
        data: error
      };
    }
  }
  static async postVote(ctx) {
    const { postid } = ctx.params;
    const contentid = ctx.request.body.contentid;
    console.log(postid, contentid);
    try {
      const result = await VoteModel.postVote(postid, contentid);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "投票成功",
        data: result
      };
    } catch (error) {
      console.error(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "投票失败",
        data: error
      };
    }
  }
}
module.exports = VoteController;
