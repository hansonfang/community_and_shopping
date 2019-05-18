module.exports = function(seq, DataTypes) {
  return seq.define(
    "product_sku",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        defaultValue: "",
        field: "attribute_name"
      },
      //销量
      sales: {
        type: DataTypes.INTEGER(11),
        defaultValue: null
      },
      //库存
      stock: {
        type: DataTypes.INTEGER(11),
        defaultValue: null
      },
      //商品单价
      price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      groupPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
        field: "spell_price"
      },
      productID: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        field: "product_id"
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "tb_purchase_product_sku"
    }
  );
};
