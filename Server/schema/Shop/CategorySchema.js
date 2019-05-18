module.exports = function(seq, DataTypes) {
  return seq.define(
    "tb_purchase_category",
    {
      // ID
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      parentID: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
        allowNull: false,
        field: "parent_id"
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
};
