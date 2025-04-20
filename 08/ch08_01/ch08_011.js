const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample2.db",
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 20], // 사용자명 길이 제한
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // 이메일 형식 검증
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 120,
    },
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
});

// Post 모델 정의
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// 관계 설정
User.hasMany(Post); // 1:N 관계 설정
Post.belongsTo(User); // N:1 관계 설정

(async () => {
  try {
    await sequelize.sync({ force: true });

    // 트랜잭션을 사용한 사용자 생성
    const transaction = await sequelize.transaction();
    try {
      const user = await User.create(
        {
          username: "ethan_lee",
          email: "ethan.lee@gmail.com",
          age: 30,
        },
        { transaction }
      );

      // 사용자의 게시물 생성
      await Post.create(
        {
          title: "첫 번째 게시물",
          content: "안녕하세요! 첫 게시물입니다.",
          UserId: user.id,
        },
        { transaction }
      );

      await transaction.commit();
      console.log("트랜잭션 성공");
    } catch (error) {
      await transaction.rollback();
      console.error("트랜잭션 실패:", error);
    }

    // 다양한 검색 조건 사용
    const users = await User.findAll({
      where: {
        status: "active",
        age: {
          [Sequelize.Op.gte]: 20,
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    console.log("활성 사용자 목록:", JSON.stringify(users, null, 2));

    // 관계 데이터 조회
    const userWithPosts = await User.findOne({
      where: { username: "ethan_lee" },
      include: [
        {
          model: Post,
          where: { views: { [Sequelize.Op.gt]: 0 } },
        },
      ],
    });
    console.log("사용자와 게시물:", JSON.stringify(userWithPosts, null, 2));

    // 일괄 업데이트
    await User.update(
      {
        status: "inactive",
      },
      {
        where: {
          age: {
            [Sequelize.Op.lt]: 18,
          },
        },
      }
    );

    // 통계 조회
    const userCount = await User.count();
    const postCount = await Post.count();
    console.log(`총 사용자 수: ${userCount}, 총 게시물 수: ${postCount}`);
  } catch (error) {
    console.error("에러 발생:", error);
  }
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
