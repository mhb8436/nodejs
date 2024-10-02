
create table users(
    id integer primary key AUTOINCREMENT,
    name varchar(100),
    email varchar(255) UNIQUE, 
    password varchar(255),
    createdAt datetime default CURRENT_TIMESTAMP
);

create table habits (
    id integer PRIMARY key AUTOINCREMENT,
    habit_name varchar(255), 
    start_date datetime,
    end_date datetime,
    createdAt datetime default CURRENT_TIMESTAMP,
    user_id integer not null, 
    FOREIGN KEY(user_id) REFERENCES users(id)
);


create table records (
    id integer PRIMARY key AUTOINCREMENT,
    memo varchar(255),
    createdAt datetime default CURRENT_TIMESTAMP,
    habit_id integer not null,
    FOREIGN KEY(habit_id) REFERENCES habits(id)
);

