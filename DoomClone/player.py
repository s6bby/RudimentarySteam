from settings import *
from map import mini_map
import pygame as pg
import math

class Player:
    def __init__(self, game):
        self.game = game
        self.x, self.y = PLAYER_POS
        self.angle = PLAYER_ANGLE
        self.dx, self.dy = 0, 0
        
    def speed_check(self, dx, dy):
        magnitude = ((dx ** 2 + dy ** 2) ** (1/2))
        if magnitude < PLAYER_SPEED_CAP * self.game.delta_time or magnitude == 0:
            return dx, dy
        else:
            dx_cap = PLAYER_SPEED_CAP * self.game.delta_time * (dx / math.sqrt(dx ** 2 + dy ** 2))
            dy_cap = PLAYER_SPEED_CAP * self.game.delta_time * (dy / math.sqrt(dx ** 2 + dy ** 2))
            return dx_cap, dy_cap
        
    def friction(self, dx, dy):
        magnitude = ((dx ** 2 + dy ** 2) ** (1/2))
        magnitude_new = 0
        if magnitude == 0:
            return dx, dy
        elif magnitude > 0:
            magnitude_new = max(magnitude - (PLAYER_FRICTION * self.game.delta_time ** 2), 0)
        elif magnitude < 0:
            magnitude_new = min(magnitude + (PLAYER_FRICTION * self.game.delta_time ** 2), 0)

        dx = magnitude_new * (dx / magnitude)
        dy = magnitude_new * (dy / magnitude)
        return dx, dy

    def movement(self):
        sin_a = math.sin(self.angle)
        cos_a = math.cos(self.angle)
        speed = PLAYER_ACCEL * self.game.delta_time
        pos_sin = speed * sin_a * self.game.delta_time
        pos_cos = speed * cos_a * self.game.delta_time

        keys = pg.key.get_pressed()
        if keys[pg.K_w]:
            self.dx += pos_cos
            self.dy += pos_sin
        if keys[pg.K_s]:
            self.dx += -pos_cos
            self.dy += -pos_sin
        if keys[pg.K_a]:
            self.dx += pos_sin
            self.dy += -pos_cos
        if keys[pg.K_d]:
            self.dx += -pos_sin
            self.dy += pos_cos
        if not (keys[pg.K_w] or keys[pg.K_s] or keys[pg.K_a] or keys[pg.K_d]):
            self.dx, self.dy = self.friction(self.dx, self.dy)

        self.dx, self.dy = self.speed_check(self.dx, self.dy)
        
        self.check_wall_collision(self.dx, self.dy)
      

        self.angle += (self.game.mouse_x / 100) * MOUSE_SENS
        self.angle %= math.tau

    def draw(self):

        #just condenses typing out self.game.width and height
        width = self.game.width
        height = self.game.height

        #allows the map to be resizable without having to hardcode values
        map_height = len(mini_map)
        map_width = len(mini_map[1])

        pg.draw.line(self.game.screen, 'blue', (self.x * width/map_width, self.y * height/map_height),
                     (self.x * width/map_width + 1000 * math.cos(self.angle),
                     self.y * height/map_height + 1000 * math.sin(self.angle)), 2)
        pg.draw.circle(self.game.screen, 'green', (self.x * width/map_width, self.y * height/map_height), 15)

    def check_wall(self, x, y):
        return (int(x), int(y)) not in self.game.map.world_map
    
    #There must be a better way to do this!
    def check_wall_collision(self, dx, dy):
        if self.check_wall(self.x + dx, self.y):
            self.x += dx
            
        elif dx > 0:
            self.x = int(self.x + dx) - 0.0001
            self.dx = 0
        elif dx < 0:
            self.x = int(self.x + dx) + 1
        if self.check_wall(int(self.x), int(self.y + dy)):
            self.y += dy
        elif dy > 0:
            self.y = int(self.y + dy) - 0.0001
            self.dy = 0
        elif dy < 0:
            self.y = int(self.y + dy) + 1


    def update(self):
        self.movement()
        
    @property
    def pos(self):
        return self.x, self.y
    
    @property
    def map_pos(self):
        return int(self.x), int(self.y)