#day08
# install postgresql 

# create database and user 
drop database ch10;
sudo -u postgres psql
create database ch10;
create user admin with encrypted password 'admin1234';
grant all privileges on database ch10 to admin;

# npx sequelize init 
npx sequelize-cli init
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli db:seed:all

