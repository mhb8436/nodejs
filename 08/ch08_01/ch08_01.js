const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
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

  // LIKE 검색 예제
  // 1. 이메일에 'gmail'이 포함된 사용자 검색
  const gmailUsers = await User.findAll({
    where: {
      email: {
        [Op.like]: "%gmail%",
      },
    },
  });
  console.log(`gmail users => ${JSON.stringify(gmailUsers)}`);

  // 2. 사용자 이름이 'ethan'으로 시작하는 사용자 검색
  const ethanUsers = await User.findAll({
    where: {
      username: {
        [Op.like]: "ethan%",
      },
    },
  });
  console.log(`ethan users => ${JSON.stringify(ethanUsers)}`);

  // 3. 이메일이 '.com'으로 끝나는 사용자 검색
  const comUsers = await User.findAll({
    where: {
      email: {
        [Op.like]: "%.com",
      },
    },
  });
  console.log(`.com users => ${JSON.stringify(comUsers)}`);

  // IN 조건 검색 예제
  // 1. 특정 사용자 이름 목록에 해당하는 사용자 검색
  const specificUsers = await User.findAll({
    where: {
      username: {
        [Op.in]: ["ethan_lee", "john_doe", "jane_smith"],
      },
    },
  });
  console.log(`specific users => ${JSON.stringify(specificUsers)}`);

  // 2. 특정 이메일 도메인을 가진 사용자 검색
  const domainUsers = await User.findAll({
    where: {
      email: {
        [Op.in]: ["%gmail.com", "%naver.com", "%yahoo.com"],
      },
    },
  });
  console.log(`domain users => ${JSON.stringify(domainUsers)}`);
})();
