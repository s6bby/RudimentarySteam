create table if not exists applications (
    app_id int primary key auto_increment,
    name varchar(255) not null,
    release_date date,
    description text,
    path varchar(255) not null
);

create table if not exists users (
    user_id int primary key auto_increment,
    username varchar(255) not null unique,
    email varchar(255) not null unique,
    hashed_password varchar(255) not null
);

create table if not exists reviews (
    user_id int primary key foreign key references users(user_id) on delete cascade,
    app_id int primary key foreign key references applications(app_id) on delete cascade,
    rating int check (rating >= 1 and rating <= 10),
    comment text,
    review_date date
);
