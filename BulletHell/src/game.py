import math
import pygame
#Basic game loop template used from pygame documentation: https://www.pygame.org

themes = {
    "Default": {
        "background": "black",
        "player": "white",
        "enemy": "red",
        "bullet": "yellow"
    },
    "Dark": {
        "background": (30, 30, 30),
        "player": (200, 200, 200),
        "enemy": (255, 100, 100),
        "bullet": (255, 255, 100)
    },
    "Light": {
        "background": (220, 220, 220),
        "player": (50, 50, 50),
        "enemy": (255, 150, 150),
        "bullet": (255, 255, 150)
    }
}

class Player:
    def __init__(self,xpos,ypos):
        self.position = pygame.Vector2(xpos, ypos)
        self.speed = 100
        self.health = 100
        self.bullets = []
        self.shootTimer = 0
        self.settings = settings
        self.color = settings.theme["player"]
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
            self.bullets.append(Bullet(self.position, pygame.mouse.get_pos()))
        for bullet in self.bullets[:]:
            if not bullet.update():
                self.bullets.remove(bullet)
            else:
                bullet.draw()
    def checkCollisions(self):
        pass        #TODO
    def move(self):
        velocity = pygame.Vector2(0, 0)
        keysPressed = pygame.key.get_pressed()
        if keysPressed[pygame.K_w]:
            velocity.y -= 1
        if keysPressed[pygame.K_s]:
            velocity.y += 1
        if keysPressed[pygame.K_a]:
            velocity.x -= 1
        if keysPressed[pygame.K_d]:
            velocity.x += 1
        #Normalize the vector to account for diagonal speed increase
        if velocity.magnitude() != 0:    
            velocity.normalize_ip() 
            self.position += velocity * self.speed * dt
    def draw(self):
        pygame.draw.circle(screen, self.color, self.position, 70)
        

class Enemy:
    def __init__(self, xpos, ypos):
        self.position = pygame.Vector2(xpos, ypos)
    def update(self, targetposition):
        pass
    def draw(self):
        pass
    def path(self, targetposition):
        pass

class Glob(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 30
        self.bullets = []
        self.shootTimer = 0
    def update(self, targetposition):
        self.path(targetposition)
        self.draw()
        self.shootTimer += dt
        if self.shootTimer >= 1:
            self.shootTimer = 0
            self.bullets.append(self.shoot(targetposition))
        for bullet in self.bullets[:]:
            if not bullet.update():
                self.bullets.remove(bullet)
            else:
                bullet.draw()
    def draw(self):
        pygame.draw.circle(screen, "red", self.position, 50)
    def path(self,targetposition):
        length = targetposition - self.position
        if length.magnitude() != 0:
            length.normalize_ip()
            self.position += length * self.speed * dt
    def shoot(self, targetposition):
        return Bullet(self.position, targetposition)

class Bullet:
    def __init__(self, position, targetposition):
        self.position = pygame.Vector2(position)
        self.speed = 200
        travelVector = pygame.Vector2(targetposition - self.position)
        if travelVector.magnitude() != 0:
            travelVector.normalize_ip()
            self.velocity = pygame.Vector2(travelVector * self.speed)
    def update(self):
        self.position += self.velocity * dt
        if self.position.x > screen.get_width() or self.position.x < 0 or self.position.y > screen.get_height() or self.position.y < 0:
            return False
        return True
    def draw(self):
        pygame.draw.circle(screen, settings.theme["bullet"], self.position, 10)

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
        self.glob.update(self.player.position)
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
            settings.theme = themes["Default"]
        elif keysPressed[pygame.K_2] and settings.unlockedThemes["Dark"]:
            settings.theme = themes["Dark"]
        elif keysPressed[pygame.K_3] and settings.unlockedThemes["Light"]:
            settings.theme = themes["Light"]
        self.draw()
        return self
    def draw(self):
        screen.fill(settings.theme["background"])
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
        self.theme = themes["Default"]
        self.unlockedThemes = {"Default": True, "Dark": False, "Light": False}
    
    

if __name__ == "__main__":
    pygame.init()
    screen = pygame.display.set_mode((1920, 1080))  #TODO: Window resizing needs to be accounted for in the way the game is drawn
    clock = pygame.time.Clock()
    dt = 0
    settings = Settings()
    game = Game()   
    game.run()