const seq = require("../config/db");
const Announcements = seq.import("../schema/Announcements/AnnouncementsSchema");

Announcements.sync({ force: false });

class AnnouncementsModel {
  static async getAnnoucesByCommunityID(id) {
    return await Announcements.findAll({
      raw: true,
      where: {
        communityID: id
      }
    });
  }

  static async delete(id) {
    return await Announcements.destroy({
      where: {
        id
      }
    });
  }
  static async update({ id, notice, description }) {
    return await Announcements.update(
      { notice, description },
      {
        where: {
          id
        }
      }
    );
  }
  static async createAnnouncement({ notice, description, showtime, communityID }) {
    return await Announcements.create({
      notice,
      description,
      showtime,
      communityID
    });
  }
}

module.exports = AnnouncementsModel;
