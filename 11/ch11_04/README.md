#day09
# install postgresql 

# create database and user 
drop database tut09;
sudo -u postgres psql
create database tut09;
create user admin with encrypted password 'admin1234';
grant all privileges on database tut09 to admin;

