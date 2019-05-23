const sequelize = require("../config/db");
const Address = sequelize.import("../schema/PurchaseShippingSchema");
const Goods = sequelize.import("../schema/Shop/GoodsSchema.js");
const GoodsSkuSchema = sequelize.import("../schema/Shop/GoodsSkuSchema");

Address.sync({ force: false });
Goods.sync({ force: false });
GoodsSkuSchema.sync({ force: false });

Goods.hasMany(GoodsSkuSchema, {
  foreignKey: "productID",
  sourceKey: "id"
});
GoodsSkuSchema.belongsTo(Goods, {
  foreignKey: "productID",
  targetKey: "id"
});

/**
 *
 *
 * @class ShoppingModel
 */
class ShoppingModel {
  /**
   * 更新地址
   */
  static async updateAddress(id, data) {
    return await Address.update(data, {
      where: {
        id
      }
    });
  }

  /**
    |--------------------------------------------------
    | 获取地址详情
    |--------------------------------------------------
    */
  static async detail(id) {
    return await Address.findOne({
      where: {
        id
      }
    });
  }
  static async getGoodsList(data) {
    const { id, page } = data;
    return await Goods.findAll({
      offset: 6 * (page - 1),
      limit: 6,
      include: [GoodsSkuSchema],
      where: {
        categoryID: id
      }
    });
  }
}
module.exports = ShoppingModel;
