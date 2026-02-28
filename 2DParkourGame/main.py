import pygame

colors = {
    "black": (0, 0, 0),
    "white": (255, 255, 255),
    "red": (255, 0, 0),
    "green": (0, 255, 0),
    "blue": (0, 0, 255),
    "gray": (128, 128, 128),
    "lightgray": (200, 200, 200),
    "sky": (135, 206, 235),
    "ground": (100, 200, 100)
}

class Button:
    def __init__(self, rect, text, font, color, hover_color, text_color=colors["black"]):
        self.rect = pygame.Rect(rect)
        self.text = text
        self.font = font
        self.color = color
        self.hover_color = hover_color
        self.text_color = text_color

    def draw(self, screen):
        hovered = self.rect.collidepoint(pygame.mouse.get_pos())
        pygame.draw.rect(screen, self.hover_color if hovered else self.color, self.rect)
        text_surface = self.font.render(self.text, True, self.text_color)
        screen.blit(text_surface, text_surface.get_rect(center=self.rect.center))

    def is_clicked(self, event):
        return (
            event.type == pygame.MOUSEBUTTONDOWN and
            event.button == 1 and
            self.rect.collidepoint(event.pos)
        )

class Scene:
    def __init__(self, game):
        self.game = game

    def handle_event(self, event):
        pass

    def update(self, dt):
        pass

    def draw(self, screen):
        pass

class MenuScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        w, h = self.game.screen.get_size()
        self.font = pygame.font.Font(None, 80)

        self.play_button = Button(
            (w//2 - 150, h//2 - 50, 300, 100),
            "Play",
            self.font,
            colors["gray"],
            colors["lightgray"]
        )

    def handle_event(self, event):
        if self.play_button.is_clicked(event):
            self.game.change_scene(GameScene(self.game))

    def draw(self, screen):
        screen.fill(colors["black"])
        self.play_button.draw(screen)

class GameScene(Scene):
    def __init__(self, game):
        super().__init__(game)

        w, h = self.game.screen.get_size()

        self.player = pygame.Rect(100, h - 150, 50, 50)
        self.player_vel = pygame.Vector2(0, 0)

        self.gravity = 1500
        self.move_speed = 400
        self.jump_strength = -700
        self.on_ground = False

        self.ground = pygame.Rect(0, h - 100, w * 3, 100)

        self.camera_x = 0

        self.enemies = [
            {
                "rect": pygame.Rect(600, h - 150, 50, 50),
                "dir": 1
            },
            {
                "rect": pygame.Rect(1000, h - 150, 50, 50),
                "dir": -1
            }
        ]

    def handle_event(self, event):
        pass

    def update(self, dt):
        keys = pygame.key.get_pressed()

        self.player_vel.x = 0
        if keys[pygame.K_a] or keys[pygame.K_LEFT]:
            self.player_vel.x = -self.move_speed
        if keys[pygame.K_d] or keys[pygame.K_RIGHT]:
            self.player_vel.x = self.move_speed

        if (keys[pygame.K_SPACE]) and self.on_ground:
            self.player_vel.y = self.jump_strength
            self.on_ground = False

        self.player_vel.y += self.gravity * dt

        self.player.x += self.player_vel.x * dt
        self.player.y += self.player_vel.y * dt

        if self.player.colliderect(self.ground):
            self.player.bottom = self.ground.top
            self.player_vel.y = 0
            self.on_ground = True

        self.camera_x = self.player.x - 300

        for enemy in self.enemies:
            enemy["rect"].x += 200 * enemy["dir"] * dt

            if enemy["rect"].left < 400 or enemy["rect"].right > 1400:
                enemy["dir"] *= -1

            if self.player.colliderect(enemy["rect"]):
                self.player.topleft = (100, self.game.screen.get_height() - 150)
                self.player_vel = pygame.Vector2(0, 0)

    def draw(self, screen):
        screen.fill(colors["sky"])

        pygame.draw.rect(screen, colors["ground"],
                         (self.ground.x - self.camera_x,
                          self.ground.y,
                          self.ground.width,
                          self.ground.height))

        pygame.draw.rect(screen, colors["blue"],
                         (self.player.x - self.camera_x,
                          self.player.y,
                          self.player.width,
                          self.player.height))

        for enemy in self.enemies:
            pygame.draw.rect(screen, colors["red"],
                             (enemy["rect"].x - self.camera_x,
                              enemy["rect"].y,
                              50,
                              50))

class LevelCompletionScene(Scene):
    def __init__(self, game):
        super().__init__(game)

class Game:
    def __init__(self, width=1280, height=720):
        pygame.init()

        self.screen = pygame.display.set_mode((width, height))
        pygame.display.set_caption("2D Side Scroller")
        self.clock = pygame.time.Clock()
        self.running = True

        self.current_scene = MenuScene(self)

    def change_scene(self, scene):
        self.current_scene = scene

    def run(self):
        while self.running:
            dt = self.clock.tick(60) / 1000

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                self.current_scene.handle_event(event)

            self.current_scene.update(dt)
            self.current_scene.draw(self.screen)
            pygame.display.flip()

        pygame.quit()

if __name__ == "__main__":
    Game().run()