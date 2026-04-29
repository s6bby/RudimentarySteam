curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=BulletHell" \
  -F "release_date=2026-054-27" \
  -F "description=Dodge the bullets and shoot back. How long can you survive?" \
  -F "app_zip=@./appsToUpload/BulletHell.zip"

