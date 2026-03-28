import math
import pygame
from settings import Settings, themes
from scenes import MainMenu
#Basic game loop template used from pygame documentation: https://www.pygame.org




      
class Game:
    def __init__(self):
        self.currentScene = MainMenu()
        self.settings = settings
    def run(self):
        pygame.display.set_caption("Bullet Hell")
        while True:
            events = pygame.event.get()
            for event in events:
                if event.type == pygame.QUIT:
                    pygame.quit()
                    return
            self.currentScene = self.currentScene.update(events)           
            global dt
            dt = clock.tick(60) / 1000   
            pygame.display.flip()
        


    

if __name__ == "__main__":
    pygame.init()
    screen = pygame.display.set_mode((1920, 1080))  #TODO: Window resizing needs to be accounted for in the way the game is drawn
    clock = pygame.time.Clock()
    dt = 0
    settings = Settings()
    game = Game()   
    game.run()