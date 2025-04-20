"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // // 1:N 관계 - User has many Posts
      // User.hasMany(models.Post, {
      //   foreignKey: "userId",
      //   as: "posts",
      // });
      // // 1:1 관계 - User has one Profile
      // User.hasOne(models.Profile, {
      //   foreignKey: "userId",
      //   as: "profile",
      // });
      // // N:M 관계 - User belongs to many Groups through UserGroup
      // User.belongsToMany(models.Group, {
      //   through: "UserGroup",
      //   foreignKey: "userId",
      //   otherKey: "groupId",
      //   as: "groups",
      // });
      // // 1:N 관계 - User has many Comments
      // User.hasMany(models.Comment, {
      //   foreignKey: "userId",
      //   as: "comments",
      // });
    }
  }
  User.init(
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
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
    }
  );
  return User;
};
