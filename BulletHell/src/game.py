import math
import pygame
#Basic game loop template used from pygame documentation: https://www.pygame.org

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Bullet Hell")


running = True
clock = pygame.time.Clock()
dt = 0

class Player:
    def __init__(self,xpos,ypos):
        self.xpos = xpos
        self.ypos = ypos
        self.speed = 100
    def update(self):
        self.move()
        self.draw()
    def move(self):
        x=0
        y=0
        keysPressed = pygame.key.get_pressed()
        if keysPressed[pygame.K_w]:
            y-=1
        if keysPressed[pygame.K_s]:
            y+=1
        if keysPressed[pygame.K_a]:
            x-=1
        if keysPressed[pygame.K_d]:
            x+=1
        length = math.sqrt(x**2+y**2)   
        #Normalize the vector to account for diagonal speed increase
        if length != 0:     
            x /= length
            y /= length
            self.xpos += x*self.speed*dt
            self.ypos += y*self.speed*dt
    def draw(self):
        pygame.draw.circle(screen, "blue", (self.xpos, self.ypos), 70)
        

if __name__ == "__main__":
    player = Player(400,300)
while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill("black")
    player.update()
    pygame.display.flip()
    dt = clock.tick(60) / 1000 
pygame.quit()