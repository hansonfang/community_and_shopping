module.exports = function(seq, DataTypes) {
  return seq.define(
    "carousel_image",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      imageURL: {
        type: DataTypes.STRING(1024),
        defaultValue: null,
        field: "image_url"
      },
      newsID: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        field: "journalism_id"
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: "tb_banner_image"
    }
  );
};
