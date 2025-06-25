"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );
  // Post 및 Comment 모델과의 관계 설정
  User.associate = function(models) {
    // 사용자가 작성한 게시물 관계 (1:N)
    User.hasMany(models.Post, {
      foreignKey: 'author_id',
      as: 'posts'
    });
    
    // 사용자가 작성한 댓글 관계 (1:N)
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      as: 'comments'
    });
  };
  
  return User;
};
