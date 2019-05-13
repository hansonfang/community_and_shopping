module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "tb_community",
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
        defaultValue: ""
      },
      address: {
        type: DataTypes.STRING(300),
        allowNull: false,
        defaultValue: ""
      },
      admin: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ""
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "create_time"
      },
      updatedAt: {
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
