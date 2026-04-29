insert into reviews (
    user_id,
    app_id,
    rating,
    comment,
    review_date
) values (%s, %s, %s, %s, %s);