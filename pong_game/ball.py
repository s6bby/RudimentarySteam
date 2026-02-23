import pygame

class Ball:
    def __init__(self, screen_width, screen_height, size=15):
        self.rect = pygame.Rect(0, 0, size, size)
        self.rect.center = (screen_width // 2, screen_height // 2)
        self.color = (255, 255, 255)
        self.velocity = pygame.Vector2(5, 0)

    def update(self):
        self.rect.x += self.velocity.x
        self.rect.y += self.velocity.y

    def reflect(self, normal):
        self.velocity.reflect_ip(normal)

    def checkCollisions(self, screen_width, screen_height):
        hit_wall = False

        if self.rect.top <= 0 or self.rect.bottom >= screen_height:
            self.velocity.y *= -1
            hit_wall = True

        if self.rect.left <= 0 or self.rect.right >= screen_width:
            self.velocity.x *= -1
            hit_wall = True

        return hit_wall

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, self.rect)