module.exports = function(seq, DataTypes) {
  return seq.define(
    "tb_purchase_product",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      categoryID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        field: "category_id"
      },
      name: {
        type: DataTypes.STRING(200),
        defaultValue: null
      },
      subtitle: {
        type: DataTypes.STRING(500),
        defaultValue: null
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      evaluationNums: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        field: "evaluation_nums"
      },
      goodEvaluationNums: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        field: "good_evaluation_nums"
      },
      mainImage: {
        type: DataTypes.STRING(300),
        defaultValue: null,
        field: "main_image"
      },
      subImages: {
        type: DataTypes.STRING(1024),
        defaultValue: null,
        field: "sub_images"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
};
