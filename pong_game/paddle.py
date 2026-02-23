import pygame

class Paddle:
    def __init__(self, x, screen_height, width=15, height=100):
        self.rect = pygame.Rect(0, 0, width, height)
        self.rect.x = x
        self.rect.centery = screen_height // 2
        self.color = (255, 255, 255)

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, self.rect)