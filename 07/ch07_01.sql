create table users (
    user_id integer primary key autoincrement,
    name text not null,
    email text,
    phone text, 
    create_dt date default (datetime('now', 'localtime'))
)





