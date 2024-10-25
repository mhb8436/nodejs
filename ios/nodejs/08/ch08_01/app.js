const { Sequelize, Model, DataTypes } = require("sequelize");
// Sequelize 객체를 생성 (sqlite를 사용함)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "post.db",
});
// 모델을 생성 (사용자 모델을 샘플로 생성)
`
    create table User (
        username VARCHAR(100) not null, 
        email VARCHAR(100)
    );
`;
// Model.init() // typescript  EC6  복잡하거나 대규모 프로젝트에서 사용, 최신 프로젝트에서 선호
// sequelize.define() // typescript 지원 잘 안됨, 작은 프로젝트, 간단한 모델 정의,
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

(async () => {
  // await를 사용하기 위해서 빈 async 함수를 정의 및 호출 합니다.
  // 실제 모델 생성, 데이터를 생성, 데이터를 가져오는 연습을 여기에 합니다.
  await sequelize.sync({ force: false });
  // insert into Users(username, email) values('user01', 'user01@gmail.com');
  const user1 = await User.create({
    username: "user01",
    email: "user01@gmail.com",
  });
  console.log(`user created => ${JSON.stringify(user1)}`);

  // select * from Users;
  const users = await User.findAll();
  console.log(`user => ${JSON.stringify(users)}`);

  // select * from Users where username = 'user01'
  const user = await User.findOne({
    where: {
      username: "user01",
    },
  });
  console.log(`user01 => ${JSON.stringify(user)}`);
  // update User set email = 'user01@naver.com' where username = 'user01'
  await User.update(
    {
      email: "user01@naver.com",
    },
    {
      where: {
        username: "user01",
      },
    }
  );

  await User.destroy({
    where: {
      username: "user01",
    },
  });
})();
