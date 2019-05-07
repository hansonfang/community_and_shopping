module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "tb_purchase_shipping",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      userID: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
        field: "user_id"
      },
      username: {
        type: DataTypes.STRING(20),
        defaultValue: null,
        field: "receiver_name"
      },
      phone: {
        type: DataTypes.STRING(20),
        defaultValue: "",
        field: "receiver_phone"
      },
      province: {
        type: DataTypes.STRING(20),
        defaultValue: "",
        field: "receiver_province"
      },
      city: {
        type: DataTypes.STRING(20),
        defaultValue: "",
        field: "receiver_city"
      },
      district: {
        type: DataTypes.STRING(20),
        defaultValue: "",
        field: "receiver_district"
      },

      address: {
        type: DataTypes.STRING(200),
        defaultValue: "",
        field: "receiver_address"
      },
      zip: {
        type: DataTypes.STRING(6),
        defaultValue: "",
        field: "receiver_zip"
      }
      //   createAt: {
      //     type: DataTypes.DATE,
      //     defaultValue: DataTypes.NOW,
      //     field: "create_time"
      //   },
      //   updateAt: {
      //     type: DataTypes.DATE,
      //     defaultValue: DataTypes.NOW,
      //     field: "update_time"
      //   }
    },
    {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: true,
      timestamps: false
    }
  );
};
