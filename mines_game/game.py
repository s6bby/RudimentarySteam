import pygame

from board import Board


class Game:
    def __init__(self):
        pygame.init()

        self.width = 1280 
        self.height = 720 
        self.screen = pygame.display.set_mode((self.width, self.height), pygame.RESIZABLE)
        pygame.display.set_caption("Mines")

        self.running = True  # used to close out of the game 
        self.clock = pygame.time.Clock() 

        self.board = Board(self.width, self.height)

        

    def run(self):
        while self.running:
            self.clock.tick(60)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False

                if event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 1:
                        self.board.handleClick(event.pos)

            self.screen.fill((0, 0, 0))

            self.board.update()
            self.board.draw(self.screen)

            pygame.display.flip()

        pygame.quit()

