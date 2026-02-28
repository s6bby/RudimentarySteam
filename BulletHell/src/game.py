import math
import pygame
#Basic game loop template used from pygame documentation: https://www.pygame.org

class Player:
    def __init__(self,xpos,ypos):
        self.xpos = xpos
        self.ypos = ypos
        self.speed = 100
        self.health = 100
        self.collider = pygame.Rect(self.xpos-70, self.ypos-70, 140, 140)
    def update(self):       
        self.move()
        self.checkCollisions()
        self.draw()      
    def checkCollisions(self):
        pass        #TODO
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
        #Normalize the vector to account for diagonal speed increase TODO: Move this logic into a vector2
        if length != 0:     
            x /= length
            y /= length
            self.xpos += x*self.speed*dt
            self.ypos += y*self.speed*dt
    def draw(self):
        pygame.draw.circle(screen, "blue", (self.xpos, self.ypos), 70)

class Enemy:
    def __init__(self, xpos, ypos):
        self.xpos = xpos
        self.ypos = ypos
    def update(self, targetX, targetY):
        pass
    def draw(self):
        pass
    def path(self, targetX, targetY):
        pass

class Glob(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 30
        self.bullets = []
        self.shootTimer = 0
    def update(self, targetX, targetY):
        self.path(targetX, targetY)
        self.draw()
        self.shootTimer += dt
        if self.shootTimer >= 1:
            self.shootTimer = 0
            self.bullets.append(self.shoot(targetX, targetY))
        for bullet in self.bullets[:]:
            if not bullet.update():
                self.bullets.remove(bullet)
            else:
                bullet.draw()
    def draw(self):
        pygame.draw.circle(screen, "red", (self.xpos, self.ypos), 50)
    def path(self,targetX, targetY):
        x=targetX - self.xpos
        y=targetY - self.ypos
        length = math.sqrt(x**2+y**2)
        if length != 0:
            x /= length
            y /= length
            self.xpos += x*self.speed*dt
            self.ypos += y*self.speed*dt
    def shoot(self, targetX, targetY):
        return Bullet(self.xpos, self.ypos, targetX, targetY)

class Bullet:
    def __init__(self, xpos, ypos, targetX, targetY):
        self.xpos = xpos
        self.ypos = ypos
        self.speed = 200
        x=targetX - self.xpos
        y=targetY - self.ypos
        length = math.sqrt(x**2+y**2)
        if length != 0:
            x /= length
            y /= length
            self.xVel = x*self.speed
            self.yVel = y*self.speed
    def update(self):
        self.xpos += self.xVel*dt
        self.ypos += self.yVel*dt
        if self.xpos > screen.get_width() or self.xpos < 0 or self.ypos > screen.get_height() or self.ypos < 0:
            return False
        return True
    def draw(self):
        pygame.draw.circle(screen, "yellow", (self.xpos, self.ypos), 10)

class Scene:
    def __init__(self):
        pass
    def update(self):
        pass
    def draw(self):
        pass
    
class MainMenu(Scene):
    def __init__(self):
        super().__init__()
    def update(self):
        self.draw()
        keysPressed = pygame.key.get_pressed()
        if keysPressed[pygame.K_SPACE]:
            return PlayScene()      #FR: Entering game
        return self
    def draw(self):
        screen.fill("black")
        font = pygame.font.SysFont(None, 48)
        text = font.render("Press Space to Start", True, "white")
        screen.blit(text, (200, 250))

class PlayScene(Scene):
    def __init__(self):
        super().__init__()
        self.player = Player(400,300)
        self.glob = Glob(100,100)
    def update(self):
        screen.fill("black")
        self.player.update()
        self.glob.update(self.player.xpos, self.player.ypos)
        return self
        
class Game:
    def __init__(self):
        self.currentScene = MainMenu()
    def update(self):
        self.currentScene = self.currentScene.update()
        global dt
        dt = clock.tick(60) / 1000   
        pygame.display.flip()
    def run(self):
        pygame.display.set_caption("Bullet Hell")
        while True:
            self.checkEvents()
            self.update()
    def checkEvents(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
        

if __name__ == "__main__":
    pygame.init()
    screen = pygame.display.set_mode((800, 600), pygame.RESIZABLE)  #TODO: Window resizing needs to be accounted for in the way the game is drawn
    clock = pygame.time.Clock()
    dt = 0
    game = Game()   
    game.run()