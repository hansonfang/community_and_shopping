const seq = require("../config/db");
const Community = seq.import("../schema/CommunitySchema");

Community.sync({ force: false });
class CommunityModel {
  static async findCommunityList() {
    return await Community.findAll({ raw: true });
  }
}

module.exports = CommunityModel;
