 module.exports=function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_post_vote",
    {
      // ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      // 标题
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "title"
      },
      // 内容描述
      description: {
        type: DataTypes.STRING(500),
        field: "description"
      },
      // 投票人数
      voteTotal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "0",
        field: "vote_total"
      },
      // 1表示单选2表示多选
      choice: {
        type: DataTypes.INTEGER(11)
      },
      //创建者id
      user_id: {
        type: DataTypes.INTEGER(11)
      },
      // 截止日期
      validityTime: {
        type: DataTypes.DATE,
        field: "validity_time"
      }
    },
    {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: true,
      timestamps: false
    }
  )
}



