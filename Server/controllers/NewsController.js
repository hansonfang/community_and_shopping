const NewsModel = require("../models/NewsModel");
const ossClient = require("../config/oss");
const fs = require("fs");

class NewsController {
  static async getAllNews(ctx) {
    const { id } = ctx.params;
    try {
      const res = await NewsModel.getAllNews(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询社区新闻成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log("查询社区新闻失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询社区新闻失败",
        data: error
      };
    }
  }
  static async getNewsDetail(ctx) {
    const { id } = ctx.params;
    try {
      const res = await NewsModel.getNewsDetail(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询新闻详情成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log("查询新闻详情失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询新闻详情失败",
        data: error
      };
    }
  }
  static async deleteNews(ctx) {
    const IDs = ctx.request.body.newsID;
    try {
      const res = await NewsModel.deleteNews(IDs);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除新闻详情(放弃新建)成功",
        data: res
      };
    } catch (error) {
      console.log("删除新闻详情失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "删除新闻详情失败",
        data: error
      };
    }
  }
  static async setCarousel(ctx) {
    const { newsID, carouselID } = ctx.request.body;
    try {
      const news = await NewsModel.getNewsMainImage(newsID);
      const { images } = news;
      const res = await NewsModel.setCarousel(carouselID, images, newsID);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新首页轮播图成功",
        data: res
      };
    } catch (error) {
      console.log("更新首页轮播图失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新首页轮播图失败",
        data: error
      };
    }
  }
  static async addSection(ctx) {
    const newsID = ctx.request.body.newsID;
    console.log(newsID);
    try {
      const res = await NewsModel.addSection(newsID);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "增加新闻段落成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log("增加新闻段落失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "增加新闻段落失败",
        data: error
      };
    }
  }
  static async createNews(ctx) {
    const comID = ctx.request.body.comID;
    try {
      const res = await NewsModel.createNews(comID);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "增加新闻成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log("增加新闻失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "增加新闻失败",
        data: error
      };
    }
  }
  static async updateContent(ctx) {
    const sections = ctx.request.body.sections;

    const meta = ctx.request.body.meta;
    try {
      NewsModel.updateMata(meta);
      if (sections) {
        sections.forEach(async section => {
          await NewsModel.updateContent(section);
        });
      }
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新新闻详情成功",
        data: null
      };
    } catch (error) {
      console.log("更新新闻详情失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新新闻详情失败",
        data: error
      };
    }
  }
  static async postImage(ctx) {
    const file = ctx.request.files.image;
    const newsID = ctx.request.body.newsID;
    try {
      const stream = fs.createReadStream(file.path);
      const result = await ossClient.putStream(
        `headlineimage/1/${file.name}`,
        stream
      );
      const imageURL = result.url;
      NewsModel.setHeadlineImage(newsID, imageURL);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "上传图片成功",
        data: { imageURL }
      };
    } catch (error) {
      console.log("上传图片失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "上传图片失败",
        data: error
      };
    }
  }
  static async postSectionImage(ctx) {
    const file = ctx.request.files.image;
    const newsID = ctx.request.body.newsID;
    const sectionID = ctx.request.body.sectionID;
    try {
      const stream = fs.createReadStream(file.path);
      const result = await ossClient.putStream(
        `headlineimage/${newsID}/${sectionID}/${file.name}`,
        stream
      );
      const imageURL = result.url;
      NewsModel.setSectionImage(sectionID, imageURL);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "上传图片成功",
        data: { imageURL }
      };
    } catch (error) {
      console.log("上传图片失败", error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "上传图片失败",
        data: error
      };
    }
  }
}
module.exports = NewsController;
