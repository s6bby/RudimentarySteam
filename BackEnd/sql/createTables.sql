create table if not exists applications (
    app_id int primary key auto_increment,
    name varchar(255) not null,
    release_date date,
    description text
);

create table if not exists users (
    user_id int primary key auto_increment,
    username varchar(255) not null unique,
    email varchar(255) not null unique,
    password varchar(255) not null,
    bio text
);

create table if not exists following (
    user_id int,
    follow_id int,
    primary key (user_id, follow_id),
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (follow_id) references users(user_id) on delete cascade
);

create table if not exists library (
    user_id int,
    app_id int,
    primary key (user_id, app_id),
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (app_id) references applications(app_id) on delete cascade
);

create table if not exists reviews (
    user_id int,
    app_id int,
    rating int check (rating >= 1 and rating <= 10),
    comment text,
    review_date date,
    primary key (user_id, app_id),
    foreign key (user_id) references users(user_id) on delete cascade,
    foreign key (app_id) references applications(app_id) on delete cascade
);
