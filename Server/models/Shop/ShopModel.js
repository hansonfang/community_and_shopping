const seq = require("../../config/db");
const CategorySchema = seq.import("../../schema/Shop/CategorySchema");
const GoodsSchema = seq.import("../../schema/Shop/GoodsSchema");
const GoodsSkuSchema = seq.import("../../schema/Shop/GoodsSkuSchema");
const Comments = seq.import("../../schema/Shop/CommentSchema");
const CategoryCarousel = seq.import("../../schema/Shop/CategoryCarouselSchema");

CategorySchema.sync({ force: false });
GoodsSchema.sync({ force: false });
GoodsSkuSchema.sync({ force: false });
Comments.sync({ force: false });
CategoryCarousel.sync({ force: false });

GoodsSchema.hasMany(GoodsSkuSchema, { foreignKey: "productID", sourceKey: "id" });
GoodsSkuSchema.belongsTo(GoodsSchema, { foreignKey: "productID", targetKey: "id" });

GoodsSchema.hasMany(Comments, { foreignKey: "productID", sourceKey: "id" });
Comments.belongsTo(GoodsSchema, { foreignKey: "productID", targetKey: "id" });

class ShopModel {
  static async getCategory() {
    return await CategorySchema.findAll({
      raw: true,
      where: {
        parentID: 0
      }
    });
  }
  static async getGoodsList(categoryID) {
    return await GoodsSchema.findAll({
      raw: true,
      where: {
        categoryID
      }
    });
  }
  static async deleteGoods(goodsID) {
    return await GoodsSchema.destroy({
      where: {
        id: goodsID
      }
    });
  }
  static async deleteComment(id) {
    return await Comments.destroy({
      where: {
        id
      }
    });
  }
  static async getGoodsDetail(id) {
    return await GoodsSchema.findOne({
      include: [GoodsSkuSchema, Comments],
      where: {
        id
      }
    });
  }
  static async getCarousels(id) {
    return await CategoryCarousel.findAll({
      where: {
        categoryID: id
      }
    });
  }
  static async updateKeyword({ id, keyword }) {
    return await CategoryCarousel.update(
      { keyword },
      {
        where: {
          id
        }
      }
    );
  }
  static async setMainImage(id, url) {
    return await GoodsSchema.update(
      { mainImage: url },
      {
        where: {
          id
        }
      }
    );
  }
  static async uploadCarouselImage(id, url, categoryID) {
    const res = await CategoryCarousel.findOne({ raw: true, where: { id } });
    if (res === null) {
      return await CategoryCarousel.create({ url, categoryID });
    } else return await CategoryCarousel.update({ url }, { where: { id } });
  }
  static async createGoods() {
    return await GoodsSchema.create({ categoryID: -1 });
  }
  static async updateGoods({ id, name, subtitle, status, categoryID }) {
    return await GoodsSchema.update(
      { name, subtitle, status, categoryID },
      {
        where: {
          id
        }
      }
    );
  }
  static async addSkuID(id) {
    return await GoodsSkuSchema.create({ name: "0" });
  }
  static async updateSku(data) {
    const { id, name, groupPrice, price, sales, stock, productID } = data;
    return await GoodsSkuSchema.update({ name, groupPrice, price, sales, stock, productID }, { where: { id } });
  }
  static async updateSubImage(id, subImages) {
    return await GoodsSchema.update({ subImages }, { where: { id } });
  }
  static async deleteSku(id) {
    return await GoodsSkuSchema.destroy({ where: { id } });
  }
  static async addSubImage(goodsID, imageURL) {
    const urls = await GoodsSchema.findOne({
      raw: true,
      attributes: ["subImages"],
      where: {
        id: goodsID
      }
    });
    if (!urls.subImages) {
      return await this.updateSubImage(goodsID, imageURL);
    }
    const res_arr = urls.subImages.split(",");
    res_arr.push(imageURL);
    return await this.updateSubImage(goodsID, res_arr.join(","));
  }
  static async editSubImage(goodsID, imageURL, index) {
    const urls = await GoodsSchema.findOne({
      raw: true,
      attributes: ["subImages"],
      where: {
        id: goodsID
      }
    });
    const res_arr = urls.subImages.split(",");
    res_arr[index] = imageURL;
    return await this.updateSubImage(goodsID, res_arr.join(","));
  }
}
module.exports = ShopModel;
