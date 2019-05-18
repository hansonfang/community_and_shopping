const ShopModel = require("../models/Shop/ShopModel");
const ossClient = require("../config/oss");
const fs = require("fs");

class ShopController {
  static async getCategory(ctx) {
    try {
      const res = await ShopModel.getCategory();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询商品目录列表成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询商品目录列表失败",
        data: error.toString()
      };
    }
  }
  static async getGoodsList(ctx) {
    const cateID = ctx.params.cateID;
    try {
      const res = await ShopModel.getGoodsList(cateID);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询商品列表成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询商品列表失败",
        data: error.toString()
      };
    }
  }
  static async getCarousels(ctx) {
    const id = ctx.params.id;
    try {
      const res = await ShopModel.getCarousels(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "查询轮播图成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "查询轮播图失败",
        data: error.toString()
      };
    }
  }
  static async deleteGoods(ctx) {
    const { id } = ctx.request.body;
    try {
      const res = await ShopModel.deleteGoods(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除商品(放弃新建)",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "删除商品失败",
        data: error.toString()
      };
    }
  }
  static async getGoodsDetail(ctx) {
    const { id } = ctx.params;
    try {
      const res = await ShopModel.getGoodsDetail(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "获取商品详情成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "获取商品详情失败",
        data: error.toString()
      };
    }
  }
  static async createGoods(ctx) {
    try {
      const res = await ShopModel.createGoods();
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "新建商品成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "新建商品失败",
        data: error.toString()
      };
    }
  }
  static async updateKeyword(ctx) {
    const data = ctx.request.body;
    try {
      const res = await ShopModel.updateKeyword(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新关键字成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新关键字失败",
        data: error.toString()
      };
    }
  }
  static async uploadMainImage(ctx) {
    const mainImage = ctx.request.files.image;
    const goodsID = ctx.request.body.goodsID;
    try {
      const stream = fs.createReadStream(mainImage.path);
      const result = await ossClient.putStream(`shop/main/${goodsID}/${mainImage.name}`, stream);
      const imageURL = result.url;
      await ShopModel.setMainImage(goodsID, imageURL);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "上传商品主图成功",
        data: { imageURL }
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "上传商品主图失败",
        data: error.toString()
      };
    }
  }
  static async uploadSubImage(ctx) {
    const mainImage = ctx.request.files.image;
    const goodsID = ctx.request.body.goodsID;
    try {
      const stream = fs.createReadStream(mainImage.path);
      const result = await ossClient.putStream(`shop/sub/${goodsID}/${mainImage.name}`, stream);
      const imageURL = result.url;
      await ShopModel.addSubImage(goodsID, imageURL);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "上传商品图成功",
        data: { imageURL }
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "上传商品图失败",
        data: error.toString()
      };
    }
  }
  static async uploadCarouselImage(ctx) {
    const mainImage = ctx.request.files.image;
    const id = ctx.request.body.id;
    const cateID = ctx.request.body.cateID;
    try {
      const stream = fs.createReadStream(mainImage.path);
      const result = await ossClient.putStream(`shop/carousels/${cateID}/${mainImage.name}`, stream);
      const imageURL = result.url;
      await ShopModel.uploadCarouselImage(id, imageURL, cateID);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "上传轮播图成功",
        data: { imageURL }
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "上传轮播图失败",
        data: error.toString()
      };
    }
  }
  static async editSubImage(ctx) {
    const mainImage = ctx.request.files.image;
    const goodsID = ctx.request.body.goodsID;
    const index = ctx.request.body.index;
    try {
      const stream = fs.createReadStream(mainImage.path);
      const result = await ossClient.putStream(`shop/sub/${goodsID}/${mainImage.name}`, stream);
      const imageURL = result.url;
      await ShopModel.editSubImage(goodsID, imageURL, index);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "上传商品图成功",
        data: { imageURL }
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "上传商品图失败",
        data: error.toString()
      };
    }
  }
  static async addSkuID(ctx) {
    const { id } = ctx.request.body;
    try {
      const res = await ShopModel.addSkuID(id);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "添加规格ID成功",
        nobox: true,
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "添加规格ID失败",
        data: error.toString()
      };
    }
  }
  static async updateGoods(ctx) {
    const data = ctx.request.body;
    try {
      const res = await ShopModel.updateGoods(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新商品信息成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新商品信息失败",
        data: error.toString()
      };
    }
  }
  static async updateSku(ctx) {
    const data = ctx.request.body;
    try {
      const res = await ShopModel.updateSku(data);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新商品规格成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新商品规格失败",
        data: error.toString()
      };
    }
  }
  static async deleteSku(ctx) {
    const { skuid } = ctx.request.body;
    try {
      const res = await ShopModel.deleteSku(skuid);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除商品规格成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "删除商品规格失败",
        data: error.toString()
      };
    }
  }
  static async deleteComment(ctx) {
    const { commentID } = ctx.request.body;
    try {
      const res = await ShopModel.deleteComment(commentID);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "删除评价成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "删除评价失败",
        data: error.toString()
      };
    }
  }
  static async updateSubImage(ctx) {
    const { goodsID, subImages } = ctx.request.body;
    try {
      const res = await ShopModel.updateSubImage(goodsID, subImages);
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message: "更新商品图成功",
        data: res
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: "更新商品图失败",
        data: error.toString()
      };
    }
  }
}

module.exports = ShopController;
