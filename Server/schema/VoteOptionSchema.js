module.exports=function (sequelize, DataTypes) {
    return sequelize.define(
      "tb_vote_option",
      {
        // ID
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        // 选项
        content: {
          type: DataTypes.STRING(300),
          allowNull: false
        },
        //所属投票id
        voteId: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          field: "vote_id"
        },
        //投票数
        voteNums: {
          type: DataTypes.INTEGER(11),
          defaultValue: 0,
          field: "vote_nums"
        },
        createAt: {
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
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false
      }
    )
  }