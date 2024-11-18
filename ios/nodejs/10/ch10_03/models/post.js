"use strict";
// models/Post.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    author: DataTypes.STRING,
  });
  Post.associate = (models) => {
    Post.hasMany(models.Comment, { foreignKey: "postId" });
  };
  return Post;
};
