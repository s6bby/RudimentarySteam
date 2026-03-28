import pygame
from settings import settings, themes
from entities import Player, Enemy, Glob


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
    def update(self, events):
        pass
    def draw(self, screen):
        pass
    
class MainMenu(Scene):
    def __init__(self):
        super().__init__()

    def update(self, events):
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
    def update(self, events):
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
        
        self.draw()
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
        self.glob = Glob(100,100)
        self.fpsCounter = FPSCounter()
    def draw(self, screen):
        screen.fill("black")
        self.player.update()
        self.glob.update(self.player.position)
        self.fpsCounter.draw()
        return self

class SettingsScene(Scene):
    def __init__(self):
        super().__init__()

    def update(self, events):
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

        self.draw()
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