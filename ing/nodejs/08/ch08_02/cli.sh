 npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
 npx sequelize-cli db:migrate
 npx sequelize-cli seed:generate --name user
 npx sequelize-cli db:seed:all
 npx sequelize-cli model:generate --name Task --attributes title:string,userId:integer
 npx sequelize-cli db:migrate
 npx sequelize-cli seed:generate --name task
 npx sequelize-cli db:seed:all
 
 touch query.js
 node query.js