module.exports = function(seq, DataTypes) {
  return seq.define(
    "tb_journalism",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(150),
        defaultValue: "",
        allowNull: false
      },
      author: {
        type: DataTypes.STRING(100),
        defaultValue: ""
      },
      description: {
        type: DataTypes.STRING(300),
        defaultValue: null
      },
      images: {
        type: DataTypes.STRING(1024),
        defaultValue: null
      },
      publishTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "publish_time"
      },
      communityID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
        field: "community_id"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
};
