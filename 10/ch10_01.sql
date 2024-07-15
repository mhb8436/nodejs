drop database tut08;
sudo -u postgres psql
create database tut08;
create user admin with encrypted password 'admin1234';
grant all privileges on database tut08 to admin;

