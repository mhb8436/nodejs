```bash
pm install sequelize sequelize-cli sqlite3
npx sequelize-cli init
npx sequelize-cli model:generate --name Post --attributes title:string,content:string,filename:string,writer:string,write_date:date
npx sequelize-cli db:migrate

```

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
