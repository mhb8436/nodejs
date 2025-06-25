'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    filename: DataTypes.STRING,
    writer: DataTypes.STRING,
    write_date: DataTypes.DATE
  }, {
    // 모델 옵션
    timestamps: true,
    underscored: false,
  });

  // 모델 관계 정의를 위한 함수 (index.js에서 호출됨)
  Board.associate = function(models) {
    // define association here
  };

  return Board;
};