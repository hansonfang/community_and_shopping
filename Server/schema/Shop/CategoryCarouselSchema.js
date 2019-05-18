module.exports = function(seq, DataTypes) {
  return seq.define(
    "categoryImage",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        field: "image_url"
      },
      categoryID: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        field: "category_id"
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "add_time"
      },
      keyword: {
        type: DataTypes.STRING(150),
        defaultValue: "null"
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "tb_purchase_image"
    }
  );
};
