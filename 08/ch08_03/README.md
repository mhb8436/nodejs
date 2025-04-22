# Sequelize-cli

```bash
pm install sequelize sequelize-cli sqlite3
npx sequelize-cli init
npx sequelize-cli model:generate --name Post --attributes title:string,content:string,filename:string,writer:string,write_date:date
npx sequelize-cli db:migrate

```

- [timestamp]-create-board.js

```json
config.json
{
  "development": {
    "dialect": "sqlite",
    "storage": "./dev.sqlite3"
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "./prod.sqlite3"
  }
}
```

### add Column

```bash
npx sequelize-cli migration:generate --name add-count-to-post
```

- add-count-to-post.js

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Posts", "count", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Posts", "count");
  },
};
```

```bash
npx sequelize-cli db:migrate
```

### column type chnage

```
npx sequelize-cli migration:generate --name change-title-length
```

- change-title-length.js

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Posts", "title", {
      type: Sequelize.STRING(50),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Posts", "title", {
      type: Sequelize.STRING, // 원래 길이 제한 없던 상태로 되돌림
    });
  },
};
```

```bash
npx sequelize-cli db:migrate
```

### Seed 파일 생성 및 실행

```bash
# 시드 파일 생성
npx sequelize-cli seed:generate --name demo-posts

# 시드 파일 실행
npx sequelize-cli db:seed:all

# 특정 시드 파일만 실행
npx sequelize-cli db:seed --seed 20240320000000-demo-posts.js

# 시드 파일 되돌리기
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:undo --seed 20240320000000-demo-posts.js
```

- demo-posts.js 예제

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", [
      {
        title: "첫 번째 게시글",
        content: "안녕하세요. 첫 번째 게시글입니다.",
        filename: "image1.jpg",
        writer: "홍길동",
        write_date: new Date(),
        count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "두 번째 게시글",
        content: "안녕하세요. 두 번째 게시글입니다.",
        filename: "image2.jpg",
        writer: "김철수",
        write_date: new Date(),
        count: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
```

### 시드 파일 수정 예제 (Validation Error 해결)

```js
// seeders/XXXXXXXXXXXXXX-demo-posts.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        "Posts",
        [
          {
            title: "첫 번째 게시글",
            content: "안녕하세요. 첫 번째 게시글입니다.",
            filename: "image1.jpg",
            writer: "홍길동",
            write_date: new Date(),
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "두 번째 게시글",
            content: "안녕하세요. 두 번째 게시글입니다.",
            filename: "image2.jpg",
            writer: "김철수",
            write_date: new Date(),
            count: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          // 각 필드의 유효성 검사 무시
          validate: false,
        }
      );
    } catch (error) {
      console.error("Seed error:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
```

### 시드 파일 실행 시 주의사항

1. **필수 필드 확인**:

   - 모델에 정의된 `allowNull: false` 필드가 모두 포함되어 있는지 확인
   - 기본값이 필요한 필드가 있는지 확인

2. **데이터 타입 확인**:

   - 날짜 필드는 `new Date()`로 올바른 형식 제공
   - 숫자 필드는 숫자 타입으로 제공
   - 문자열 필드는 문자열 타입으로 제공

3. **유니크 제약 조건**:

   - `unique: true`로 설정된 필드의 값이 중복되지 않도록 주의

4. **외래 키 제약 조건**:

   - 참조하는 테이블의 데이터가 먼저 생성되어 있어야 함
   - 예: Comment를 생성하기 전에 Post가 먼저 생성되어 있어야 함

5. **시드 파일 실행 순서**:

```bash
# 시드 파일 생성
npx sequelize-cli seed:generate --name demo-posts
npx sequelize-cli seed:generate --name demo-comments

# 시드 파일 실행 (순서대로)
npx sequelize-cli db:seed --seed XXXXXXXXXXXXXX-demo-posts.js
npx sequelize-cli db:seed --seed XXXXXXXXXXXXXX-demo-comments.js
```

### 추가 CLI 명령어

```bash
# 모델 생성 (기존 모델 파일 유지)
npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer

# 마이그레이션 상태 확인
npx sequelize-cli db:migrate:status

# 마지막 마이그레이션 되돌리기
npx sequelize-cli db:migrate:undo

# 모든 마이그레이션 되돌리기
npx sequelize-cli db:migrate:undo:all

# 특정 마이그레이션까지 되돌리기
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

# 시드 파일 생성 (특정 모델에 대한)
npx sequelize-cli seed:generate --name demo-users

# 특정 환경에서 마이그레이션 실행
npx sequelize-cli db:migrate --env production

# 모델 스캐폴딩 (모델, 마이그레이션, 시드 파일 한번에 생성)
npx sequelize-cli model:generate --name Comment --attributes content:text,postId:integer --scaffold
```

### 모델 간 관계 설정 예제

```js
// models/post.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  });

  Post.associate = (models) => {
    Post.hasMany(models.Comment);
  };

  return Post;
};

// models/comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post);
  };

  return Comment;
};
```

### 마이그레이션에서 관계 설정

```js
// migrations/XXXXXXXXXXXXXX-create-comments.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
  },
};
```

### 클래스 방식 모델 정의와 연관 관계 설정

```js
// models/post.js
const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        filename: DataTypes.STRING,
        writer: DataTypes.STRING,
        write_date: DataTypes.DATE,
        count: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "posts",
        timestamps: true,
        underscored: false,
        paranoid: false,
      }
    );
  }

  static associate(models) {
    // 1:N 관계 (Post has many Comments)
    this.hasMany(models.Comment, {
      foreignKey: "postId",
      sourceKey: "id",
      as: "comments",
    });

    // N:M 관계 (Post belongs to many Tags)
    // this.belongsToMany(models.Tag, {
    //   through: "PostTag",
    //   foreignKey: "postId",
    //   otherKey: "tagId",
    //   as: "tags",
    // });

    // // 1:1 관계 (Post has one User as author)
    // this.belongsTo(models.User, {
    //   foreignKey: "authorId",
    //   as: "author",
    // });
  }
}

module.exports = Post;

// models/comment.js
const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: DataTypes.TEXT,
        postId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Comment",
        tableName: "comments",
      }
    );
  }

  static associate(models) {
    // N:1 관계 (Comment belongs to Post)
    this.belongsTo(models.Post, {
      foreignKey: "postId",
      targetKey: "id",
      as: "post",
    });
  }
}

module.exports = Comment;

// models/tag.js
const { Model, DataTypes } = require("sequelize");

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Tag",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Post, {
      through: "PostTag",
      foreignKey: "tagId",
      otherKey: "postId",
      as: "posts",
    });
  }
}

module.exports = Tag;
```

### 모델 연결 설정 (index.js)

```js
// models/index.js
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

### createdAt 컬럼 처리 방법

1. **마이그레이션 파일에서 default 값 설정**:

```js
// migrations/XXXXXXXXXXXXXX-create-posts.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      // ... 다른 컬럼들 ...
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
```

2. **시드 파일에서 명시적으로 값 설정**:

```js
// seeders/XXXXXXXXXXXXXX-demo-posts.js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          title: "첫 번째 게시글",
          content: "안녕하세요. 첫 번째 게시글입니다.",
          filename: "image1.jpg",
          writer: "홍길동",
          write_date: now,
          count: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          title: "두 번째 게시글",
          content: "안녕하세요. 두 번째 게시글입니다.",
          filename: "image2.jpg",
          writer: "김철수",
          write_date: now,
          count: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {
        validate: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
```

3. **모델에서 timestamps 설정**:

```js
// models/post.js
const { Model, DataTypes } = require("sequelize");

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        // ... 모델 속성들 ...
      },
      {
        sequelize,
        modelName: "Post",
        timestamps: true, // createdAt, updatedAt 자동 생성
        createdAt: true, // createdAt 컬럼 사용
        updatedAt: true, // updatedAt 컬럼 사용
        underscored: false,
        paranoid: false,
      }
    );
  }
}
```

### 마이그레이션 실행 순서

1. 먼저 기존 마이그레이션을 되돌립니다:

```bash
npx sequelize-cli db:migrate:undo:all
```

2. 수정된 마이그레이션을 실행합니다:

```bash
npx sequelize-cli db:migrate
```

3. 시드 파일을 실행합니다:

```bash
npx sequelize-cli db:seed:all
```
