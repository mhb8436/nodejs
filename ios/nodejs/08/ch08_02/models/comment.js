module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.STRING,
  });
  Comment.associate = function (models) {
    models.Comment.belongsTo(models.Post);
  };

  return Comment;
};
