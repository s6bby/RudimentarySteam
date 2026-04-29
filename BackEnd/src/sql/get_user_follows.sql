select users.user_id, users.username, users.email, users.bio
from following
join users on following.follow_id = users.user_id
where following.user_id = %s;
