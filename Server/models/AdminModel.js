const sequelize = require("../config/db");
const User = sequelize.import("../schema/UserSchema.js");
const Community = sequelize.import("../schema/CommunitySchema.js");

User.sync({ force: false });
Community.sync({ force: false });

class AdminModel {
  static async getUserByID(id) {
    return await User.findOne({
      raw: true,
      where: {
        id
      }
    });
  }

  static async getCommunityList() {
    return await Community.findAll({ raw: true });
  }
}
module.exports = AdminModel;
