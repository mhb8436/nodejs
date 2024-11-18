"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { foreignKey: "postId" });
    Comment.belongsTo(models.Comment, { foreignKey: "parentId", as: "Parent" });
    Comment.hasMany(models.Comment, { foreignKey: "parentId", as: "Replies" });
  };
  return Comment;
};
