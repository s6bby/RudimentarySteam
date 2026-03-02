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

        self.player = Paddle(x=30, screen_height = self.height) # controls the x posiiton, 
        self.opponent = Paddle(x=self.width - 30 - 15, screen_height =  self.height) # did have help with ai for determining how the spacing for the paddles should be, 


    def gameReset(self): 
        self.ball.rect.center = (self.width // 2, self.height // 2)
        self.ball.velocity = pygame.Vector2(2, 0)

        self.player.rect.centery = self.height // 2
        self.opponent.rect.centery = self.height // 2
    

    def run(self):
        while self.running:
            self.clock.tick(60)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False

            keys = pygame.key.get_pressed()
            paddle_speed = 6

            # for game reset
            if keys[pygame.K_BACKSPACE]: 
                self.gameReset()

            if keys[pygame.K_w] or keys[pygame.K_UP]:
                self.player.rect.y -= paddle_speed

            if keys[pygame.K_s] or keys[pygame.K_DOWN]:
                self.player.rect.y += paddle_speed

            # keep paddle on screen
            if self.player.rect.top < 0:
                self.player.rect.top = 0

                
            if self.player.rect.bottom > self.height:
                self.player.rect.bottom = self.height

            self.screen.fill((0, 0, 0))
            
            self.ball.update()

            offset = (
                self.ball.rect.left - self.player.rect.left,
                self.ball.rect.top - self.player.rect.top
            )

            ball_mask = pygame.mask.Mask(self.ball.rect.size, fill=True)

            if self.player.mask.overlap(ball_mask, offset) and self.ball.velocity.x < 0:
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



            if self.ball.rect.colliderect(self.opponent.rect):
                self.ball.reflect(pygame.Vector2(-1, 0))

            if self.ball.checkCollisions(self.width, self.height):
                print("Wall hit")

                # scoring needs to be here.

            self.ball.draw(self.screen)
            self.player.draw(self.screen)
            self.opponent.draw(self.screen)

            pygame.display.flip()

        pygame.quit()