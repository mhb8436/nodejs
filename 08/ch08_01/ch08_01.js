const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.sqlite",
});

// console.log(sequelize);
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: true });

  const user = await User.create({
    username: "ethan_lee",
    email: "ethan.lee@gmail.com",
  });
  console.log(`user created => ${JSON.stringify(user)}`);

  const users = await User.findAll();
  console.log(`user findall => ${JSON.stringify(users)}`);

  await User.update(
    {
      email: "ethan.lee@naver.com",
    },
    {
      where: {
        username: "ethan_lee",
      },
    }
  );
  const updated_user = await User.findOne({
    where: { username: "ethan_lee" },
  });
  console.log(`user updated_user => ${JSON.stringify(updated_user)}`);

  await User.destroy({
    where: {
      username: "ethan_lee",
    },
  });
  const deleted_user = await User.findOne({
    where: { username: "ethan_lee" },
  });
  console.log(`user deleted_user => ${JSON.stringify(deleted_user)}`);
})();

// const Post = sequelize.define('Post', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     }
// });

// User.hasMany(Post); // 1:N 관계 설정
// Post.belongsTo(User); // N:1 관계 설정
