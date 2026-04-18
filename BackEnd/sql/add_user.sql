insert into users (
    username,
    email,
    hashed_password,
    bio,
    avatar,
    friend_list,
    `library`
) values (%s, %s, %s, %s, %s, %s, %s);
