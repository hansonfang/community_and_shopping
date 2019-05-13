module.exports = function(seq, DataTypes) {
  return seq.define(
    "tb_journalism_content",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.STRING(1024),
        defaultValue: "",
        field: "image_url"
      },
      newsID: {
        type: DataTypes.STRING(11),
        allowNull: false,
        field: "journalism_id"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
};
