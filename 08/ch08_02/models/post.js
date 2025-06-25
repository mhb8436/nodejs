"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      filename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      write_date: DataTypes.DATE,
    },
    {
      tableName: "posts",
      underscored: true,
    }
  );

  // User 및 Comment 모델과의 관계 설정
  Post.associate = function(models) {
    // 게시물 작성자 관계 (N:1)
    Post.belongsTo(models.User, {
      foreignKey: 'author_id',
      as: 'author'
    });
    
    // 게시물에 달린 댓글 관계 (1:N)
    Post.hasMany(models.Comment, {
      foreignKey: 'post_id',
      as: 'comments'
    });
  };

  return Post;
};
