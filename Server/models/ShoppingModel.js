const sequelize = require("../config/db");
const Address = sequelize.import("../schema/PurchaseShippingSchema");

Address.sync({ force: false });

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
}
module.exports = ShoppingModel;
