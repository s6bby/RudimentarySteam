import pygame

from paddle import Paddle
from ball import Ball

class Game:
    def __init__(self):
        pygame.init()

        self.width = 1280 
        self.height = 720 
        self.screen = pygame.display.set_mode((self.width, self.height), pygame.RESIZABLE)
        pygame.display.set_caption("Pong")

        self.running = True  # used to close out of the game 
        self.clock = pygame.time.Clock() 

        self.ball = Ball(self.width, self.height)

        self.player = Paddle(30, self.height, "assets/newplayerPaddle.png")

        self.opponent = Paddle(self.width - 128 - 30, self.height, "assets/newopponentPaddle.png") # did have help with ai for determining how the spacing for the paddles should be, 

        self.playerScore = 0
        self.opponentScore = 0

        self.playerScore = 0
        self.opponentScore = 0

        print("Players moves with W and S")
        print("Opponent moves with arrow up and arrow down")

        self.font = pygame.font.Font(None, 50)  # default pygame font

        
    def gameReset(self): 
        self.ball.rect.center = (self.width // 2, self.height // 2)
        self.ball.velocity = pygame.Vector2(self.ball.speed, 0)

        self.player.rect.centery = self.height // 2
        self.opponent.rect.centery = self.height // 2
    

    def drawScore(self):
        scoreText = self.font.render(
            f"{self.playerScore}  {self.opponentScore}", True, (255,255,255)
        )

        self.screen.blit(scoreText, (self.width//2 - 50, 20))


    def run(self):
        while self.running:
            self.clock.tick(60)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False

            keys = pygame.key.get_pressed()
            paddle_speed = 9

            # for game reset
            if keys[pygame.K_BACKSPACE]: 
                self.gameReset()

            if keys[pygame.K_w]:
                self.player.rect.y -= paddle_speed

            if keys[pygame.K_s]:
                self.player.rect.y += paddle_speed

            
            # TEMP opponent controls 

            if keys[pygame.K_UP]:
                self.opponent.rect.y -= paddle_speed

            if keys[pygame.K_DOWN]:
                self.opponent.rect.y += paddle_speed


            # keep playerPaddle on screen
            if self.player.rect.top < 0:
                self.player.rect.top = 0

                
            if self.player.rect.bottom > self.height:
                self.player.rect.bottom = self.height


            # keep opponentPaddle on screen
            if self.opponent.rect.top < 0:
                self.opponent.rect.top = 0

            if self.opponent.rect.bottom > self.height:
                self.opponent.rect.bottom = self.height


            self.screen.fill((0, 0, 0))
            
            self.ball.update()

            offset = (
                self.ball.rect.left - self.player.rect.left,
                self.ball.rect.top - self.player.rect.top
            )

            ball_mask = self.ball.mask

            if self.player.mask.overlap(ball_mask, offset) and self.ball.velocity.x < 0:

               #  self.ball.rect.left = self.player.rect.right do not use
                # self.ball.rect.x -= self.ball.velocity.x breaks game
                self.ball.rect.x = self.ball.prev_x
                self.ball.rect.y = self.ball.prev_y     

                paddle_height = self.player.rect.height
                third = paddle_height / 3

                top_boundary = self.player.rect.top + third
                bottom_boundary = self.player.rect.bottom - third

                if self.ball.rect.centery < top_boundary:
                    self.ball.velocity = pygame.Vector2(5, -4)
                elif self.ball.rect.centery > bottom_boundary:
                    self.ball.velocity = pygame.Vector2(5, 4)
                else:
                    self.ball.velocity = pygame.Vector2(5, 0)


            offset = (
                self.ball.rect.left - self.opponent.rect.left,
                self.ball.rect.top - self.opponent.rect.top
            )

            if self.opponent.mask.overlap(ball_mask, offset) and self.ball.velocity.x > 0:

               # self.ball.rect.right = self.opponent.rect.left This lags out the ball NOOOOOOO

                # self.ball.rect.x -= self.ball.velocity.x

                self.ball.rect.x = self.ball.prev_x
                self.ball.rect.y = self.ball.prev_y

                self.ball.reflect(pygame.Vector2(-1, 0))
        


            collision = self.ball.checkCollisions(self.width, self.height)

            if collision == "player":
                self.playerScore += 1
                print("Player scored!")
                print("Score:", self.playerScore, "-", self.opponentScore)
                self.gameReset()

            elif collision == "opponent":
                self.opponentScore += 1
                print("Opponent scored!")
                print("Score:", self.playerScore, "-", self.opponentScore)
                self.gameReset()

            

            self.ball.draw(self.screen)
            self.player.draw(self.screen)
            self.opponent.draw(self.screen)

            
            self.drawScore()

            pygame.display.flip()

        pygame.quit()