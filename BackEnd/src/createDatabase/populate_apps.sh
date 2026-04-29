curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=BulletHell" \
  -F "release_date=2026-054-27" \
  -F "description=Dodge the bullets and shoot back. How long can you survive?" \
  -F "app_zip=@./appsToUpload/BulletHell.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=2D Parkour Game" \
  -F "release_date=2026-054-27" \
  -F "description=" \
  -F "app_zip=@./appsToUpload/2DParkourGame.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Clicker Game" \
  -F "release_date=2026-054-27" \
  -F "description=" \
  -F "app_zip=@./appsToUpload/ClickerGame.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Mines" \
  -F "release_date=2026-054-27" \
  -F "description=" \
  -F "app_zip=@./appsToUpload/Mines.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Pong" \
  -F "release_date=2026-054-27" \
  -F "description=" \
  -F "app_zip=@./appsToUpload/Pong.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Text Adventure" \
  -F "release_date=2026-054-27" \
  -F "description=" \
  -F "app_zip=@./appsToUpload/TextAdventure.zip"

