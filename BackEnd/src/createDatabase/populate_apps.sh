curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=BulletHell" \
  -F "release_date=2026-054-27" \
  -F "description=Dodge the bullets and shoot back. How long can you survive?" \
  -F "app_zip=@./appsToUpload/BulletHell.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=2D Parkour Game" \
  -F "release_date=2026-054-27" \
  -F "description=Player controls a cube and tries to make it to the end of the level past enemies" \
  -F "app_zip=@./appsToUpload/2DParkourGame.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Clicker Game" \
  -F "release_date=2026-054-27" \
  -F "description=Player uses a mouse to click on moving objects to get a high score and coins to buy effects like explosions on click" \
  -F "app_zip=@./appsToUpload/ClickerGame.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Mines" \
  -F "release_date=2026-054-27" \
  -F "description=Player places a bet and reveals tiles on a grid, trying to avoid hidden bombs. Each safe tile increases potential payout, while hitting a bomb ends the round and loses the bet." \
  -F "app_zip=@./appsToUpload/Mines.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Pong" \
  -F "release_date=2026-054-27" \
  -F "description=Player controls a paddle to hit the ball back and forth against an AI opponent. Points are scored when the opponent misses, with added speed changes and buffs that make gameplay more dynamic." \
  -F "app_zip=@./appsToUpload/Pong.zip"

curl -X POST http://127.0.0.1:5000/api/application \
  -F "name=Text Adventure" \
  -F "release_date=2026-054-27" \
  -F "description=Player customizes their character and choosing their stats and makes decisions that affect the outcome of the game" \
  -F "app_zip=@./appsToUpload/TextAdventure.zip"

