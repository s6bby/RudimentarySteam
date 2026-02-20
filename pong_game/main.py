import pygame



class Paddle:
    def __init__(self, x, screen_height, width=15, height=100):
        self.rect = pygame.Rect(0, 0, width, height)
        self.rect.x = x
        self.rect.centery = screen_height // 2
        self.color = (255, 255, 255)

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, self.rect)

class Ball:
    def __init__(self, screen_width, screen_height, size=15):
        self.rect = pygame.Rect(0, 0, size, size)
        self.rect.center = (screen_width // 2, screen_height // 2)
        self.color = (255, 255, 255)

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, self.rect)


class Game:
    def __init__(self):
        pygame.init()

        self.width = 1000
        self.height = 700
        self.screen = pygame.display.set_mode((self.width, self.height), pygame.RESIZABLE)
        pygame.display.set_caption("Pong")

        self.running = True
        self.clock = pygame.time.Clock()

        self.ball = Ball(self.width, self.height)
        self.player = Paddle(x=30, screen_height=self.height)
        self.opponent = Paddle(x=self.width - 30 - 15, screen_height=self.height)




    def run(self):
        while self.running:
            self.clock.tick(60)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False

            keys = pygame.key.get_pressed()
            paddle_speed = 6

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
            
            self.ball.draw(self.screen)
            self.player.draw(self.screen)
            self.opponent.draw(self.screen)

            pygame.display.flip()

        pygame.quit()




if __name__ == "__main__":
    Game().run()
