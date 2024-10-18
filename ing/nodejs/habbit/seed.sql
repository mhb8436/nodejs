create table if not exists users(
    id integer primary key AUTOINCREMENT,
    name varchar(100),
    email varchar(255) UNIQUE, 
    password varchar(255),
    createdAt datetime default CURRENT_TIMESTAMP
);

insert into users(name, email, password) values('홍길동','hong1@gmail.com','admin1234'); -- 1
insert into users(name, email, password) values('이영록','rok1@gmail.com','admin1234');  -- 2

create table if not exists habits (
    id integer PRIMARY key AUTOINCREMENT,
    habit_name varchar(255), 
    start_date datetime,
    end_date datetime,
    createdAt datetime default CURRENT_TIMESTAMP,
    user_id integer not null, 
    FOREIGN KEY(user_id) REFERENCES users(id)
);
insert into habits(habit_name, start_date, end_date, user_id) values('아침운동하기','2024-10-01','2024-10-30', 1);
insert into habits(habit_name, start_date, end_date, user_id) values('점심운동하기','2024-10-01','2024-10-30', 1);
insert into habits(habit_name, start_date, end_date, user_id) values('저녁운동하기','2024-10-01','2024-10-30', 1);

create table if not exists records (
    id integer PRIMARY key AUTOINCREMENT,
    memo varchar(255),
    createdAt datetime default CURRENT_TIMESTAMP,
    habit_id integer not null,
    FOREIGN KEY(habit_id) REFERENCES habits(id)
);
insert into records(memo, habit_id) values('1일차 아침운동', 7);
insert into records(memo, habit_id) values('2일차 아침운동', 7);
insert into records(memo, habit_id) values('3일차 아침운동', 7);
insert into records(memo, habit_id) values('4일차 아침운동', 7);

insert into records(memo, habit_id) values('1일차 점심운동', 8);
insert into records(memo, habit_id) values('2일차 점심운동', 8);
insert into records(memo, habit_id) values('3일차 점심운동', 8);
insert into records(memo, habit_id) values('4일차 점심운동', 8);

