"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "comments",
      underscored: true,
    }
  );

  // User 및 Post 모델과의 관계 설정
  Comment.associate = function(models) {
    // 댓글 작성자 관계 (N:1)
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author'
    });
    
    // 댓글이 달린 게시물 관계 (N:1)
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post'
    });
  };

  return Comment;
};
