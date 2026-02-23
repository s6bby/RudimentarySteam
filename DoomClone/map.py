import pygame as pg

# could use 0, but _ makes the map much more readable
_ = False

mini_map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, _, _, _, _, _, _, _, _, _, _, _, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, _, _, _, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, 1, 1, 1, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, 1, _, _, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, 1, _, _, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, 1, _, _, _, _, _, 1],
    [1, _, _, _, _, _, _, _, _, 1, _, _, _, _, _, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]


class Map:
    def __init__(self, game):
        self.game = game
        self.mini_map = mini_map

        # This is important. We call get_map() in the init to fill world_map at object creation
        # This way it does not have to be called again by the user.
        self.world_map = {}
        self.get_map()

    # This takes mini_map and stores coordinate values for every 1 in mini_map
    def get_map(self):
        for j, row in enumerate(self.mini_map):
            for i, value in enumerate(row):
                if value:
                    self.world_map[(i, j)] = value

    
    #NEED TO LOOK THIS UP
    def draw(self):

        #just condenses typing out self.game.width and height
        width = self.game.width
        height = self.game.height

        #allows the map to be resizable without having to hardcode values
        map_height = len(mini_map)
        map_width = len(mini_map[1])

        #iterates over world_map (which stores coordinates of every full square) and draws a square
        for pos in self.world_map:
            pg.draw.rect(self.game.screen, 'darkgray', (pos[0] * width/map_width, pos[1] * height/map_height, width/map_width, height/map_height), 2)
