import pygame


class Cell:
    def __init__(self, x, y, size=48):
        self.rect = pygame.Rect(x, y, size, size)
        self.hiddenColor = (17, 104, 168)
        self.revealedColor = (255, 185, 35)
        self.borderColor = (9, 76, 124)
        self.isRevealed = False

    def reveal(self):
        self.isRevealed = True

    def draw(self, screen):
        color = self.revealedColor if self.isRevealed else self.hiddenColor

        pygame.draw.rect(screen, color, self.rect, border_radius=8)
        pygame.draw.rect(screen, self.borderColor, self.rect, 3, border_radius=8)
