import math
# game settings
RES = WIDTH, HEIGHT = 1600, 900
HALF_WIDTH = WIDTH // 2
HALF_HEIGHT = HEIGHT // 2

FPS = 0

PLAYER_POS = 1.5, 5 # starting pos on mini_map
PLAYER_ANGLE = (3 * math.pi) / 2 #starting angle

#Keep in mind these are all per millisecond and not per second.
PLAYER_ACCEL =  0.00009
PLAYER_FRICTION =  0.00004
PLAYER_SPEED_CAP = 0.003 #Technically magnitude of position change per millisecond

MOUSE_SENS = 0.2

FOV = math.pi / 3
HALF_FOV = FOV / 2
NUM_RAYS = WIDTH // 2
HALF_NUM_RAYS = NUM_RAYS // 2
DELTA_ANGLE = FOV / NUM_RAYS
MAX_DEPTH = 20

SCREEN_DIST = HALF_WIDTH / math.tan(HALF_FOV)
SCALE = WIDTH // NUM_RAYS

TEXTURE_SIZE = 256
HALF_TEXTURE_SIZE = TEXTURE_SIZE // 2