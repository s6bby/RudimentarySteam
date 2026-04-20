import pygame


class Cell:
    def __init__(self, x, y, size=48):
        self.rect = pygame.Rect(x, y, size, size)
        self.hiddenColor = (17, 104, 168)
        self.revealedColor = (255, 185, 35)
        self.bombColor = (215, 0, 64)
        self.isRevealed = False
        self.cellBomb = False

    def reveal(self):
        self.isRevealed = True

    def draw(self, screen):
        color = self.hiddenColor

        if self.isRevealed:
            if self.cellBomb:
                color = self.bombColor
            else:
                color = self.revealedColor

        pygame.draw.rect(screen, color, self.rect)