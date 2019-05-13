const seq = require("../config/db");
const News = seq.import("../schema/News/NewsSchema");
const NewsContent = seq.import("../schema/News/NewsContentSchema");

News.hasMany(NewsContent, { foreignKey: "newsID", sourceKey: "id", onDelete: "cascade", hooks: true });
NewsContent.belongsTo(News, { foreignKey: "newsID", targetKey: "id", onDelete: "cascade", hooks: true });

News.sync({ force: false });
NewsContent.sync({ force: false });

class NewsModel {
  static async getAllNews(communityID) {
    return await News.findAll({
      raw: true,
      where: {
        communityID
      }
    });
  }
  static async getNewsDetail(newsID) {
    return await News.findOne({
      include: [NewsContent],
      where: {
        id: newsID
      }
    });
  }
  static async updateContent(data) {
    return await NewsContent.update(
      { content: data.content },
      {
        where: {
          id: data.id
        }
      }
    );
  }
  static async updateMata(data) {
    return await News.update(
      { title: data.title, author: data.author, description: data.description },
      {
        where: {
          id: data.newsID
        }
      }
    );
  }
  static async addSection(newsID) {
    return await NewsContent.create({ newsID });
  }
  static async createNews(communityID) {
    return await News.create({ title: "wait for update", communityID });
  }

  static async setHeadlineImage(newsID, url) {
    return await News.update(
      { images: url },
      {
        where: {
          id: newsID
        }
      }
    );
  }
  static async setSectionImage(sectionID, url) {
    return await NewsContent.update(
      { image: url },
      {
        where: {
          id: sectionID
        }
      }
    );
  }
  static async deleteNews(newsID) {
    newsID.forEach(id => {
      NewsContent.destroy({
        where: {
          newsID: id
        }
      });
    });

    return await News.destroy({
      where: {
        id: newsID
      }
    });
  }
}
module.exports = NewsModel;
