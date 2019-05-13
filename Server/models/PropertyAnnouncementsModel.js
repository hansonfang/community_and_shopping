const seq = require("../config/db");
const PropertyAnnouncements = seq.import("../schema/Announcements/PropertyAnnouncementsSchema");

PropertyAnnouncements.sync({ force: false });

class PropertyAnnouncementsModel {
  static async getPropertyAnnouncements() {
    return await PropertyAnnouncements.findAll({
      raw: true
    });
  }

  static async createAnnouncement({ notice, description }) {
    return await PropertyAnnouncements.create({
      notice,
      description
    });
  }

  static async delete(id) {
    return await PropertyAnnouncements.destroy({
      where: {
        id
      }
    });
  }
  static async update({ id, notice, description }) {
    return await PropertyAnnouncements.update(
      { notice, description },
      {
        where: {
          id
        }
      }
    );
  }
}
module.exports = PropertyAnnouncementsModel;
