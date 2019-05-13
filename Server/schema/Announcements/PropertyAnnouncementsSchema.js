module.exports = function(seq, DataTypes) {
  return seq.define(
    "tb_notice_proper",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      notice: {
        type: DataTypes.STRING(125),
        defaultValue: "",
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      showtime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      userID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1,
        field: "user_id"
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "create_time"
      },
      updateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "update_time"
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
};
