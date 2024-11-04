module.exports = (sequelize, DataTypes) => {
  /**
   * create table Comment(
   *   id integer primary key autoincrement,
   *   content text,
   *   postId integer,
   *   foreign key (postId) referecnes Posts(id)
   * )
   */
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
    models.Comment.belongsTo(models.Post); //PostId
  };
  return Comment;
};
