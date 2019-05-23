const sequelize = require("../config/db");
const Vote = sequelize.import("../schema/VoteSchema");
const VoteOptions = sequelize.import("../schema/VoteOptionSchema");

Vote.hasMany(VoteOptions, { foreignKey: "vote_id", sourceKey: "id" });
VoteOptions.belongsTo(Vote, { foreignKey: "vote_id", targetKey: "id" });

//启动后不再强制删除表
Vote.sync({ force: false });
VoteOptions.sync({ force: false });

/**
 *
 *
 * @class VoteModel
 */
class VoteModel {
  /**
   * 获取全部的投票信息
   * @returns {Promise:Array<Model>}
   */
  static async getVoteDetail(id) {
    return await Vote.findOne({
      //   raw: true,
      include: [VoteOptions],
      // attributes: {exclude: ['is_del']}
      where: {
        id
      }
    });
  }

  /**
   *
   *
   * @static
   * @returns Promise:Array<Model>
   * @memberof VoteModel
   */
  static async getAllVoteList() {
    return await Vote.findAll();
  }

  static async postVote(postid, contentid) {
    contentid.forEach(id => {
      sequelize.query(
        `update tb_vote_option set vote_nums=vote_nums+1 where id=${id}`
      );
    });
  }
}
module.exports = VoteModel;
