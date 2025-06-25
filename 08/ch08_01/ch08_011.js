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

// Comment 모델 정의
const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// 관계 설정
// User와 Post 관계
User.hasMany(Post, { foreignKey: 'authorId' }); // 1:N 관계 설정
Post.belongsTo(User, { foreignKey: 'authorId' }); // N:1 관계 설정

// User와 Comment 관계
User.hasMany(Comment, { foreignKey: 'userId' }); // 1:N 관계 설정
Comment.belongsTo(User, { foreignKey: 'userId' }); // N:1 관계 설정

// Post와 Comment 관계
Post.hasMany(Comment, { foreignKey: 'postId' }); // 1:N 관계 설정
Comment.belongsTo(Post, { foreignKey: 'postId' }); // N:1 관계 설정

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
      const post = await Post.create(
        {
          title: "첫 번째 게시물",
          content: "안녕하세요! 첫 게시물입니다.",
          authorId: user.id,
        },
        { transaction }
      );
      
      // 댓글 생성
      await Comment.create(
        {
          content: "좋은 게시물이네요!",
          userId: user.id,
          postId: post.id
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
    const commentCount = await Comment.count();
    console.log(`총 사용자 수: ${userCount}, 총 게시물 수: ${postCount}, 총 댓글 수: ${commentCount}`);
    
    // OR 조건 예제 (Sequelize.Op.or)
    console.log("\n===== OR 조건 예제 =====");
    const postsWithOrCondition = await Post.findAll({
      where: {
        [Sequelize.Op.or]: [
          { views: { [Sequelize.Op.gte]: 10 } },
          { title: { [Sequelize.Op.like]: '%첫%' } }
        ]
      }
    });
    console.log("OR 조건 검색 결과 (조회수 10 이상 또는 제목에 '첫'이 포함된 게시물):");
    console.log(JSON.stringify(postsWithOrCondition, null, 2));
    
    // AND 조건 예제 (Sequelize.Op.and)
    console.log("\n===== AND 조건 예제 =====");
    const usersWithAndCondition = await User.findAll({
      where: {
        [Sequelize.Op.and]: [
          { age: { [Sequelize.Op.gte]: 20 } },
          { age: { [Sequelize.Op.lt]: 40 } },
          { status: 'active' }
        ]
      }
    });
    console.log("AND 조건 검색 결과 (20세 이상 40세 미만이면서 활성 상태인 사용자):");
    console.log(JSON.stringify(usersWithAndCondition, null, 2));
    
    // AND와 OR 조건 조합 예제
    console.log("\n===== AND와 OR 조건 조합 예제 =====");
    const combinedConditionUsers = await User.findAll({
      where: {
        [Sequelize.Op.or]: [
          { 
            [Sequelize.Op.and]: [
              { age: { [Sequelize.Op.lt]: 25 } },
              { status: 'active' }
            ]
          },
          {
            [Sequelize.Op.and]: [
              { age: { [Sequelize.Op.gt]: 50 } },
              { username: { [Sequelize.Op.like]: '%lee%' } }
            ]
          }
        ]
      }
    });
    console.log("복합 조건 검색 결과 (25세 미만 활성 사용자 또는 50세 초과하면서 이름에 'lee'가 포함된 사용자):");
    console.log(JSON.stringify(combinedConditionUsers, null, 2));
    
    // 게시물과 댓글 함께 조회
    const postWithComments = await Post.findOne({
      where: { title: "첫 번째 게시물" },
      include: [
        {
          model: Comment,
          include: [User] // 댓글 작성자 정보도 함께 조회
        },
        {
          model: User,
          as: 'author' // authorId로 연결된 사용자 정보
        }
      ]
    });
    console.log("게시물과 댓글:", JSON.stringify(postWithComments, null, 2));
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
