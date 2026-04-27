import math
import pygame
from settings import settings, themes
from entities import (
    GlorpSpawner, HealthSpawner, Player, Enemy, Glob, 
    GlobSpawner, EntityManager, Bullet, PlayerBullet
)
#idea for background and menu asthetic created with help of Google Gemeni: https://gemini.google.com/
THEME_REQUIREMENTS = {
    "Default": {"cost": 0, "preview": (100, 100, 100)},
    "Dark": {"cost": 500, "preview": (30, 30, 30)},
    "Light": {"cost": 1500, "preview": (220, 220, 220)}
}

class Scene:
    def __init__(self):
        self.selected_index = 0
        self.font_title = pygame.font.SysFont("Arial", 64, bold=True)
        self.font_menu = pygame.font.SysFont("Arial", 32, bold=True)
        self.font_info = pygame.font.SysFont("Arial", 24)


    def draw_background(self, screen):
        screen.fill((10, 10, 20))
        for i in range(0, settings.SCREEN_WIDTH, 64):
            pygame.draw.line(screen, (20, 20, 40), (i, 0), (i, settings.SCREEN_HEIGHT))
        for i in range(0, settings.SCREEN_HEIGHT, 64):
            pygame.draw.line(screen, (20, 20, 40), (0, i), (settings.SCREEN_WIDTH, i))

    def draw_selectable_item(self, screen, text, y_pos, index, x_pos=150):
        is_selected = self.selected_index == index
        color = "yellow" if is_selected else "white"
        
        if is_selected:
            highlight_rect = pygame.Rect(x_pos - 10, y_pos - 5, 400, 45)
            pygame.draw.rect(screen, (50, 50, 0), highlight_rect, border_radius=5)
            pygame.draw.rect(screen, "yellow", highlight_rect, 2, border_radius=5)
            
        txt_surf = self.font_menu.render(text, True, color)
        screen.blit(txt_surf, (x_pos, y_pos))

class MainMenu(Scene):
    def __init__(self):
        super().__init__()
        self.options = ["START GAME", "THEME SHOP", "SETTINGS", "QUIT"]

    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    self.selected_index = (self.selected_index - 1) % len(self.options)
                elif event.key == pygame.K_DOWN:
                    self.selected_index = (self.selected_index + 1) % len(self.options)
                elif event.key == pygame.K_RETURN:
                    if self.selected_index == 0: return PlayScene()
                    if self.selected_index == 1: return ThemeShop()
                    if self.selected_index == 2: return SettingsScene()
                    if self.selected_index == 3: 
                        pygame.quit()
                        exit()
        return self

    def draw(self, screen):
        self.draw_background(screen)
        title = self.font_title.render("BULLET HELL", True, "red")
        screen.blit(title, (settings.SCREEN_WIDTH//2 - title.get_width()//2, 80))
        
        for i, opt in enumerate(self.options):
            self.draw_selectable_item(screen, opt, 250 + (i * 60), i)
            
        hs_text = self.font_info.render(f"BEST SCORE: {settings.highScore}", True, "cyan")
        screen.blit(hs_text, (settings.SCREEN_WIDTH - 220, settings.SCREEN_HEIGHT - 40))

class ThemeShop(Scene):
    def __init__(self):
        super().__init__()
        self.themes_list = ["Default", "Dark", "Light"]

    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE: return MainMenu()
                if event.key == pygame.K_UP:
                    self.selected_index = (self.selected_index - 1) % len(self.themes_list)
                elif event.key == pygame.K_DOWN:
                    self.selected_index = (self.selected_index + 1) % len(self.themes_list)
                elif event.key == pygame.K_RETURN:
                    name = self.themes_list[self.selected_index]
                    cost = THEME_REQUIREMENTS[name]["cost"]
                    if settings.highScore >= cost:
                        settings.unlockedThemes[name] = True
                        settings.theme = themes[name]
        return self

    def draw(self, screen):
        self.draw_background(screen)
        title = self.font_title.render("THEME SHOP", True, "white")
        screen.blit(title, (50, 50))
        info = self.font_info.render(f"Current Highscore: {settings.highScore}", True, "cyan")
        screen.blit(info, (50, 120))
        
        for i, name in enumerate(self.themes_list):
            cost = THEME_REQUIREMENTS[name]["cost"]
            is_unlocked = settings.unlockedThemes.get(name, False)
            pygame.draw.circle(screen, THEME_REQUIREMENTS[name]["preview"], (110, 230 + (i * 70)), 15)
            status = "[UNLOCKED]" if is_unlocked else f"COST: {cost}"
            display_text = f"{name} - {status}"
            self.draw_selectable_item(screen, display_text, 210 + (i * 70), i)

        footer = self.font_info.render("Press ESC to go back", True, "gray")
        screen.blit(footer, (50, settings.SCREEN_HEIGHT - 40))

class SettingsScene(Scene):
    def __init__(self):
        super().__init__()
        self.options = ["Volume", "Difficulty", "Back"]

    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    self.selected_index = (self.selected_index - 1) % len(self.options)
                elif event.key == pygame.K_DOWN:
                    self.selected_index = (self.selected_index + 1) % len(self.options)
                if self.selected_index == 0:
                    if event.key == pygame.K_RIGHT: settings.volume = min(1.0, settings.volume + 0.1)
                    if event.key == pygame.K_LEFT: settings.volume = max(0.0, settings.volume - 0.1)
                elif self.selected_index == 1:
                    diffs = ["Easy", "Normal", "Hard"]
                    idx = diffs.index(settings.difficulty)
                    if event.key == pygame.K_RIGHT: settings.difficulty = diffs[(idx + 1) % 3]
                    if event.key == pygame.K_LEFT: settings.difficulty = diffs[(idx - 1) % 3]
                elif event.key == pygame.K_RETURN and self.selected_index == 2:
                    return MainMenu()
                elif event.key == pygame.K_ESCAPE:
                    return MainMenu()
        return self

    def draw(self, screen):
        self.draw_background(screen)
        title = self.font_title.render("SETTINGS", True, "white")
        screen.blit(title, (50, 50))
        vol_text = f"Volume: {int(settings.volume * 100)}%"
        diff_text = f"Difficulty: {settings.difficulty}"
        self.draw_selectable_item(screen, vol_text, 200, 0)
        self.draw_selectable_item(screen, diff_text, 270, 1)
        self.draw_selectable_item(screen, "Back to Main Menu", 340, 2)

class PlayScene(Scene):
    def __init__(self):
        super().__init__()
        self.entityManager = EntityManager()
        self.player = Player(self.entityManager.map_width // 2, self.entityManager.map_height // 2)
        self.entityManager.add(GlobSpawner(self.entityManager))
        self.entityManager.add(GlorpSpawner(self.entityManager))
        self.entityManager.add(HealthSpawner(self.entityManager))
        self.entityManager.add(self.player)
        self.camera = Camera(settings.SCREEN_WIDTH, settings.SCREEN_HEIGHT)
        self.score_ui = scoreDisplay()

    def update(self, screen, events, dt):
        self.entityManager.mouse_world_pos = pygame.mouse.get_pos() + pygame.Vector2(self.camera.camera.topleft)
        for event in events:
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                return MainMenu()
        self.entityManager.update(screen, dt)
        self.camera.update(self.player)
        if self.player.health <= 0:
            return GameOver(self.player.score)
        return self
        
    def draw(self, screen):
        screen.fill("black")
        self.entityManager.draw(screen, self.camera)
        self.score_ui.draw(screen, self.player.score)

class GameOver(Scene):
    def __init__(self, final_score):
        super().__init__()
        self.final_score = final_score
        if self.final_score > settings.highScore:
            settings.highScore = self.final_score

    def update(self, screen, events, dt):
        for event in events:
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN:
                    return MainMenu()
        return self

    def draw(self, screen):
        screen.fill((50, 0, 0))
        title = self.font_title.render("GAME OVER", True, "white")
        score = self.font_menu.render(f"FINAL SCORE: {self.final_score}", True, "yellow")
        prompt = self.font_info.render("Press ENTER to return to Main Menu", True, "white")
        screen.blit(title, (settings.SCREEN_WIDTH//2 - title.get_width()//2, 150))
        screen.blit(score, (settings.SCREEN_WIDTH//2 - score.get_width()//2, 250))
        screen.blit(prompt, (settings.SCREEN_WIDTH//2 - prompt.get_width()//2, 350))

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
        x = target.position.x - int(settings.SCREEN_WIDTH / 2)
        y = target.position.y - int(settings.SCREEN_HEIGHT / 2)
        self.camera = pygame.Rect(x, y, self.width, self.height)

class scoreDisplay:
    def __init__(self):
        self.font = pygame.font.SysFont("Arial", 28, bold=True)
    def draw(self, screen, score):
        pygame.draw.rect(screen, (0,0,0, 150), (5, 5, 200, 40))
        text = self.font.render(f"SCORE: {score}", True, "white")
        screen.blit(text, (15, 10))

class FPSCounter:
    def __init__(self):
        self.font = pygame.font.SysFont(None, 24)
    def draw(self, screen, clock):
        fps = int(clock.get_fps())
        text = self.font.render(f"FPS: {fps}", True, "white")
        screen.blit(text, (settings.SCREEN_WIDTH - 80, 10))