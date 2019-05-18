module.exports = function(seq, DataTypes) {
  return seq.define(
    "comments",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nickname: {
        type: DataTypes.STRING(100),
        defaultValue: "1"
      },
      content: {
        type: DataTypes.TEXT
      },
      imageURL: {
        type: DataTypes.STRING(1024),
        defaultValue: null,
        field: "image_url"
      },
      skuName: {
        type: DataTypes.STRING(500),
        defaultValue: null,
        field: "attribute_name"
      },
      commentTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "evaluation_time"
      },
      type: {
        type: DataTypes.INTEGER(11),
        defaultValue: "1"
      },
      productID: {
        type: DataTypes.INTEGER(11),
        field: "product_id"
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "tb_purchase_evaluation"
    }
  );
};
