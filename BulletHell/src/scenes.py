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

    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    return PlayScene()
                elif event.key == pygame.K_t:
                    return ThemeShop()
                elif event.key == pygame.K_s:
                    return SettingsScene()
        return self
    def draw(self, screen):
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
        self.player = Player(400,300)
        self.entityManager = EntityManager()
        self.globSpawner = GlobSpawner(self.entityManager)
        self.glorpSpawner = GlorpSpawner(self.entityManager)
        self.entityManager.add(self.globSpawner)
        self.entityManager.add(self.glorpSpawner)
        self.entityManager.add(self.player)
        self.enemies = []
        self.camera = Camera(settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT)
    def update(self, screen, events, dt):
            self.entityManager.mouse_world_pos = pygame.mouse.get_pos() + pygame.Vector2(self.camera.camera.topleft)
            for event in events:
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        return MainMenu()
            self.entityManager.update(screen, dt)
            self.camera.update(self.player)
            if self.player.health <= 0:
                return MainMenu()
            return self
        
    def draw(self, screen):
        screen.fill("black")
        self.entityManager.draw(screen, self.camera)
        return self

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
        # Returns a new Rect shifted by the camera offset
        return rect.move(-self.camera.x, -self.camera.y)

    def update(self, target):
        # Center the camera on the player (target)
        x = target.position.x - int(settings.SCREEN_WIDTH / 2)
        y = target.position.y - int(settings.SCREEN_HEIGHT / 2)
        

        self.camera = pygame.Rect(x, y, self.width, self.height)


