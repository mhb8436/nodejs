#day06

npx sequelize init

npx sequelize-cli migration:generate --name add-column-filename

await queryInterface.addColumn("Posts", "filename", {
type: Sequelize.STRING,
allowNull: true, // 새로 추가되는 컬럼이므로 null 허용
});
