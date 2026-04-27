curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=MyAwesomeApp" \
  -F "release_date=2024-05-20" \
  -F "description=This is a description of my app." \
  -F "app_zip=@./test.zip"