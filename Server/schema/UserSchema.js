module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "tb_user",
    {
      // ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      // 标题
      username: {
        type: DataTypes.STRING(100),
        defaultValue: ""
      },
      // 内容描述
      nickname: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      // 投票人数
      idcard: {
        type: DataTypes.STRING(150),
        defaultValue: ""
      },
      // 1表示管理员 0表示普通用户
      admin_int: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        field: "integral"
      },
      //female表示女,male表示男
      gender: {
        type: DataTypes.STRING(10),
        defaultValue: ""
      },
      // 截止日期
      birthday: {
        type: DataTypes.DATEONLY,
        defaultValue: null
      },
      avatar: {
        type: DataTypes.STRING(4096),
        defaultValue: ""
      },
      motto: {
        type: DataTypes.STRING(300),
        defaultValue: ""
      },
      email: {
        type: DataTypes.STRING(128),
        defaultValue: ""
      },
      phone: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: ""
      },
      community_id: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0
      },
      sign_up: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
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
