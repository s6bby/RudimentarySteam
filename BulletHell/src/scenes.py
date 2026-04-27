from cmath import rect
import math

import pygame
from settings import settings, themes
from entities import GlorpSpawner, Player, Enemy, Glob, GlobSpawner, EntityManager, Bullet, PlayerBullet






class FPSCounter:
    def __init__(self):
        self.font = pygame.font.SysFont(None, 24)
    def draw(self, screen, clock):
        fps = int(clock.get_fps())
        text = self.font.render(f"FPS: {fps}", True, "white")
        screen.blit(text, (10, 10))
        
class scoreDisplay:
    def __init__(self):
        self.font = pygame.font.SysFont(None, 24)
    def draw(self, screen, score):
        text = self.font.render(f"Score: {score}", True, "white")
        screen.blit(text, (10, 40))
    

class Scene:
    def __init__(self):
        pass
    def update(self, events, dt):
        pass
    def draw(self, screen):
        pass
    
class MainMenu(Scene):
    def __init__(self):
        super().__init__()
        self.selectedOption = 0
#add a selector for the menu options and use arrow keys to navigate
    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    self.selectedOption = (self.selectedOption - 1) % 3
                elif event.key == pygame.K_DOWN:
                    self.selectedOption = (self.selectedOption + 1) % 3
                elif event.key == pygame.K_RETURN:
                    if self.selectedOption == 0:
                        return PlayScene()
                    elif self.selectedOption == 1:
                        return ThemeShop()
                    elif self.selectedOption == 2:
                        return SettingsScene()
        return self
    def draw(self, screen):
        screen.fill("black")
        font = pygame.font.SysFont(None, 48)
        if self.selectedOption == 0:
            text = font.render("Start", True, "yellow")
        else:
            text = font.render("Start", True, "white")
        screen.blit(text, (200, 250))
        if self.selectedOption == 1:
            text2 = font.render("Theme Shop", True, "yellow")
        else:
            text2 = font.render("Theme Shop", True, "white")
        screen.blit(text2, (150, 300))
        if self.selectedOption == 2:
            text3 = font.render("Settings", True, "yellow")
        else:
            text3 = font.render("Settings", True, "white")
        screen.blit(text3, (150, 350))

class ThemeShop(Scene):
    def __init__(self):
        super().__init__()
    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    return MainMenu()              
                elif event.key == pygame.K_1 and not settings.unlockedThemes["Default"]:
                    settings.unlockedThemes["Default"] = True              
                elif event.key == pygame.K_2 and not settings.unlockedThemes["Dark"]:
                    settings.unlockedThemes["Dark"] = True               
                elif event.key == pygame.K_3 and not settings.unlockedThemes["Light"]:
                    settings.unlockedThemes["Light"] = True
        return self
    def draw(self, screen):
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
        self.player = Player(2500,1000)
        self.entityManager = EntityManager()
        self.globSpawner = GlobSpawner(self.entityManager)
        self.glorpSpawner = GlorpSpawner(self.entityManager)
        self.entityManager.add(self.globSpawner)
        self.entityManager.add(self.glorpSpawner)
        self.entityManager.add(self.player)
        self.enemies = []
        self.camera = Camera(settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT)
        self.scoreDisplay = scoreDisplay()
    def update(self, screen, events, dt):
            self.entityManager.mouse_world_pos = pygame.mouse.get_pos() + pygame.Vector2(self.camera.camera.topleft)
            for event in events:
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        return MainMenu()
            self.entityManager.update(screen, dt)
            self.camera.update(self.player)
            if self.player.health <= 0:
                settings.highScore = self.player.score
                return GameOver()
            return self
        
    def draw(self, screen):
        screen.fill("black")
        self.entityManager.draw(screen, self.camera)
        self.scoreDisplay.draw(screen, self.player.score)
        return self

class GameOver(Scene):
    def __init__(self):
        super().__init__()
    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    return MainMenu()
        return self
    def draw(self, screen):
        font = pygame.font.SysFont(None, 48)
        text = font.render("GAME OVER: Press enter for main menu", True, "red")
        screen.blit(text, (50, 50))

class SettingsScene(Scene):
    def __init__(self):
        super().__init__()

    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    return MainMenu()
                
                elif event.key == pygame.K_UP:
                    settings.volume = min(1.0, settings.volume + 0.1)
                
                elif event.key == pygame.K_DOWN:
                    settings.volume = max(0.0, settings.volume - 0.1)
                
                elif event.key == pygame.K_LEFT:
                    if settings.difficulty == "Hard":
                        settings.difficulty = "Normal"
                    elif settings.difficulty == "Normal":
                        settings.difficulty = "Easy"
                
                elif event.key == pygame.K_RIGHT:
                    if settings.difficulty == "Easy":
                        settings.difficulty = "Normal"
                    elif settings.difficulty == "Normal":
                        settings.difficulty = "Hard"
                
                elif event.key == pygame.K_1 and settings.unlockedThemes["Default"]:
                    settings.theme = themes["Default"]
                
                elif event.key == pygame.K_2 and settings.unlockedThemes["Dark"]:
                    settings.theme = themes["Dark"]
                
                elif event.key == pygame.K_3 and settings.unlockedThemes["Light"]:
                    settings.theme = themes["Light"]
        return self
    def draw(self, screen):
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
        
        
class Camera:
    def __init__(self, width, height):
        self.camera = pygame.Rect(0, 0, width, height)
        self.width = width
        self.height = height

    def apply(self, entity):
        return entity.position - pygame.Vector2(self.camera.topleft)
    
    def apply_rect(self, rect):
        return rect.move(-self.camera.x, -self.camera.y)

    def update(self, target):
        # Center the camera on the player (target)
        x = target.position.x - int(settings.SCREEN_WIDTH / 2)
        y = target.position.y - int(settings.SCREEN_HEIGHT / 2)
        

        self.camera = pygame.Rect(x, y, self.width, self.height)


