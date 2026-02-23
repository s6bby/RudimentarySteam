import pygame as pg
import sys
from settings import *
from map import *
from player import *
from debug_info import *
from raycaster import *
from object_render import *

# all of the fuctions needed to run the game
class Game:
    # function for initializing the game
    def __init__(self):
        pg.init()
        self.screen = pg.display.set_mode((RES), pg.RESIZABLE)
        self.clock = pg.time.Clock()
        self.delta_time = 0
        self.mouse_x, self.mouse_y = 0,0
        self.pause = True
        self.new_game()
        

    def new_game(self):
        self.map = Map(self)
        self.player = Player(self)
        self.debug = Debug(self)
        self.object_render = ObjectRender(self)
        self.raycasting = RayCasting(self)

    def update(self):
        self.mouse_x, self.mouse_y = pg.mouse.get_rel()
        # Might be a better way to do this, but temporarily this is how we will get resizable window resolution
        self.height = self.screen.get_height()
        self.width = self.screen.get_width()
        self.player.update()
        self.raycasting.update()
        pg.display.flip()


    def draw(self):
        self.screen.fill('black')
        self.object_render.draw()
        #self.player.draw()
        #self.map.draw()
        self.debug.draw()
        pg.display.set_caption(f'{self.clock.get_fps() :.1f}')

    def check_events(self):
        for event in pg.event.get():
            if event.type == pg.KEYDOWN and event.key == pg.K_ESCAPE:
                if self.pause:
                    pg.mouse.set_visible(True)
                    pg.event.set_grab(False)
                    self.pause = False
                else:
                    pg.mouse.set_visible(False)
                    pg.event.set_grab(True)
                    self.mouse_x, self.mouse_y = pg.mouse.get_rel()
                    self.pause = True
            elif event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            elif event.type == pg.KEYDOWN and event.key == pg.K_1:
                if self.debug.debug_flag:
                    self.debug.debug_flag = False
                else:
                    self.debug.debug_flag = True

    def run(self):
        pg.mouse.set_visible(False)
        pg.event.set_grab(True)
        while True:
            self.check_events()
            if self.pause:
                self.update()
            self.draw()
            #I dont like that this is here, but it works better
            self.delta_time = self.clock.tick(FPS)

if __name__ == '__main__':
    game = Game()
    game.run()