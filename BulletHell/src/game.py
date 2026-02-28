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
        self.bullets = []
        self.shootTimer = 0
        self.settings = settings
    def update(self):       
        self.move()
        self.checkCollisions()
        self.draw()  
        self.shoot()         
    def shoot(self):
        keysPressed = pygame.key.get_pressed()
        self.shootTimer += dt
        if keysPressed[pygame.K_SPACE] and self.shootTimer >= 0.25:
            self.shootTimer = 0
            mouseX, mouseY = pygame.mouse.get_pos()
            self.bullets.append(Bullet(self.xpos, self.ypos, mouseX, mouseY))
        for bullet in self.bullets[:]:
            if not bullet.update():
                self.bullets.remove(bullet)
            else:
                bullet.draw()
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
        if self.settings.theme == "Default":
            pygame.draw.circle(screen, "blue", (self.xpos, self.ypos), 70)
        elif self.settings.theme == "Dark":
            pygame.draw.circle(screen, "cyan", (self.xpos, self.ypos), 70)
        elif self.settings.theme == "Light":
            pygame.draw.circle(screen, "navy", (self.xpos, self.ypos), 70)

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
        elif keysPressed[pygame.K_t]:
            return ThemeShop()     #FR: Entering theme shop
        elif keysPressed[pygame.K_s]:
            return SettingsScene() #FR: Entering settings
        return self
    def draw(self):
        screen.fill("black")
        font = pygame.font.SysFont(None, 48)
        text = font.render("Press Space to Start", True, "white")
        screen.blit(text, (200, 250))
        text2 = font.render("Press T for Theme Shop", True, "white")
        screen.blit(text2, (150, 300))
        text3 = font.render("Press S for Settings", True, "white")
        screen.blit(text3, (150, 350))

class ThemeShop(Scene):
    def __init__(self):
        super().__init__()
    def update(self):
        keysPressed = pygame.key.get_pressed()
        if keysPressed[pygame.K_SPACE]:
            return MainMenu()     #FR: Returning to main menu
        elif keysPressed[pygame.K_1] and not settings.unlockedThemes["Default"]:
            settings.unlockedThemes["Default"] = True
        elif keysPressed[pygame.K_2] and not settings.unlockedThemes["Dark"]:
            settings.unlockedThemes["Dark"] = True
        elif keysPressed[pygame.K_3] and not settings.unlockedThemes["Light"]:
            settings.unlockedThemes["Light"] = True
        self.draw()
        return self
    def draw(self):
        screen.fill("black")
        font = pygame.font.SysFont(None, 48)
        text = font.render("Theme Shop", True, "white")
        screen.blit(text, (50, 50))
        text2 = font.render("Press Space to Return", True, "white")
        screen.blit(text2, (50, 100))
        text3 = font.render("Press 1 to buy Default Theme", True, "white")
        screen.blit(text3, (50, 150))
        text4 = font.render("Press 2 to buy Dark Theme", True, "white")
        screen.blit(text4, (50, 200))
        text5 = font.render("Press 3 to buy Light Theme", True, "white")
        screen.blit(text5, (50, 250))


class PlayScene(Scene):
    def __init__(self):
        super().__init__()
        self.player = Player(400,300)
        self.glob = Glob(100,100)
        self.fpsCounter = FPSCounter()
    def update(self):
        screen.fill("black")
        self.player.update()
        self.glob.update(self.player.xpos, self.player.ypos)
        self.fpsCounter.draw()
        return self

class SettingsScene(Scene):
    def __init__(self):
        super().__init__()
    def update(self):
        keysPressed = pygame.key.get_pressed()
        if keysPressed[pygame.K_SPACE]:
            return MainMenu()     #FR: Returning to main menu
        elif keysPressed[pygame.K_UP]:
            settings.volume = min(1.0, settings.volume + 0.1)   #FR: Increase volume
        elif keysPressed[pygame.K_DOWN]:
            settings.volume = max(0.0, settings.volume - 0.1)   #FR: Decrease volume
        elif keysPressed[pygame.K_LEFT]:
            if settings.difficulty == "Hard":
                settings.difficulty = "Normal"
            elif settings.difficulty == "Normal":
                settings.difficulty = "Easy"
        elif keysPressed[pygame.K_RIGHT]:
            if settings.difficulty == "Easy":
                settings.difficulty = "Normal"
            elif settings.difficulty == "Normal":
                settings.difficulty = "Hard"
        elif keysPressed[pygame.K_1] and settings.unlockedThemes["Default"]:
            settings.theme = "Default"
        elif keysPressed[pygame.K_2] and settings.unlockedThemes["Dark"]:
            settings.theme = "Dark"
        elif keysPressed[pygame.K_3] and settings.unlockedThemes["Light"]:
            settings.theme = "Light"
        self.draw()
        return self
    def draw(self):
        screen.fill("black")
        font = pygame.font.SysFont(None, 48)
        text = font.render("Settings", True, "white")
        screen.blit(text, (50, 50))
        text2 = font.render("Press Space to Return", True, "white")
        screen.blit(text2, (50, 100))
        text3 = font.render(f"Volume: {settings.volume}", True, "white")
        screen.blit(text3, (50, 150))
        text4 = font.render(f"Difficulty: {settings.difficulty}", True, "white")
        screen.blit(text4, (50, 200))
        text5 = font.render(f"Theme: {settings.theme}", True, "white")
        screen.blit(text5, (50, 250))
      
class Game:
    def __init__(self):
        self.currentScene = MainMenu()
        self.settings = settings
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
        

class FPSCounter:
    def __init__(self):
        self.font = pygame.font.SysFont(None, 24)
    def draw(self):
        fps = int(clock.get_fps())
        text = self.font.render(f"FPS: {fps}", True, "white")
        screen.blit(text, (10, 10))

class Settings:
    def __init__(self):
        self.volume = 1.0
        self.difficulty = "Normal"
        self.theme = "Default"
        self.unlockedThemes = {"Default": True, "Dark": False, "Light": False}
    
    

if __name__ == "__main__":
    pygame.init()
    screen = pygame.display.set_mode((1920, 1080))  #TODO: Window resizing needs to be accounted for in the way the game is drawn
    clock = pygame.time.Clock()
    dt = 0
    settings = Settings()
    game = Game()   
    game.run()