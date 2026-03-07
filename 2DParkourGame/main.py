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
    def handle_event(self, event): pass
    def update(self, dt): pass
    def draw(self, screen): pass

class Spike:
    def __init__(self, rect):
        self.rect = pygame.Rect(rect)

    def draw(self, screen, camera_x):
        pygame.draw.polygon(
            screen,
            colors["red"],
            [
                (self.rect.x - camera_x, self.rect.bottom),
                (self.rect.centerx - camera_x, self.rect.top),
                (self.rect.right - camera_x, self.rect.bottom)
            ]
        )
class Projectile:
    def __init__(self, x, y, direction):
        self.rect = pygame.Rect(x, y, 10, 10)
        self.speed = 500
        self.direction = direction

    def update(self, dt):
        self.rect.x += self.speed * self.direction * dt

    def draw(self, screen, camera_x):
        pygame.draw.rect(
            screen,
            colors["green"],
            (self.rect.x - camera_x, self.rect.y, 10, 10)
        )
class Platform:
    def __init__(self, rect, moving=False, move_range=0, speed=0):
        self.rect = pygame.Rect(rect)
        self.start_x = self.rect.x
        self.moving = moving
        self.move_range = move_range
        self.speed = speed
        self.direction = 1

    def update(self, dt):
        if self.moving:
            self.rect.x += self.speed * self.direction * dt
            if abs(self.rect.x - self.start_x) >= self.move_range:
                self.direction *= -1

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

        self.camera_x = 0

        self.platforms = [
            Platform((0, h - 100, w * 3, 100)),
            Platform((400, h - 250, 200, 20)),
            Platform((750, h - 350, 200, 20)),
            Platform((1100, h - 220, 200, 20)),
            Platform((1500, h - 300, 250, 20), moving=True, move_range=200, speed=150),
        ]

        self.spikes = [
            Spike((500, h - 120, 40, 20)),
            Spike((540, h - 120, 40, 20)),
            Spike((580, h - 120, 40, 20))
        ]

        self.enemies = [
            {"rect": pygame.Rect(600, h - 150, 50, 50), "vel": pygame.Vector2(0, 0)},
            {"rect": pygame.Rect(1200, h - 150, 50, 50), "vel": pygame.Vector2(0, 0)},
        ]

        middle_platform = self.platforms[2].rect
        self.jumping_enemy = {
            "rect": pygame.Rect(
                middle_platform.centerx - 25,
                middle_platform.top - 50,
                50,
                50
            ),
            "vel": pygame.Vector2(0, 0),
            "jump_strength": -600
        }

        self.level_end = pygame.Rect(2000, h - 200, 100, 100)

        self.shooters = [
            {
                "rect": pygame.Rect(1700, h - 150, 50, 50),
                "cooldown": 0
            }
        ]

        self.projectiles = []
    def move_and_collide(self, rect, velocity, dt):
        previous_rect = rect.copy()

        rect.x += velocity.x * dt
        for platform in self.platforms:
            if rect.colliderect(platform.rect):
                if velocity.x > 0:
                    rect.right = platform.rect.left
                elif velocity.x < 0:
                    rect.left = platform.rect.right

        rect.y += velocity.y * dt
        grounded = False

        for platform in self.platforms:
            if rect.colliderect(platform.rect):
                if velocity.y > 0 and previous_rect.bottom <= platform.rect.top:
                    rect.bottom = platform.rect.top
                    velocity.y = 0
                    grounded = True
                elif velocity.y < 0 and previous_rect.top >= platform.rect.bottom:
                    rect.top = platform.rect.bottom
                    velocity.y = 0

        return grounded

    def update(self, dt):
        keys = pygame.key.get_pressed()

        self.player_vel.x = 0
        if keys[pygame.K_a] or keys[pygame.K_LEFT]:
            self.player_vel.x = -self.move_speed
        if keys[pygame.K_d] or keys[pygame.K_RIGHT]:
            self.player_vel.x = self.move_speed

        if keys[pygame.K_SPACE] and self.on_ground:
            self.player_vel.y = self.jump_strength

        self.player_vel.y += self.gravity * dt

        for platform in self.platforms:
            platform.update(dt)

        self.on_ground = self.move_and_collide(self.player, self.player_vel, dt)
        self.camera_x = self.player.x - 300

        for enemy in self.enemies:
            rect = enemy["rect"]
            vel = enemy["vel"]

            vel.x = -200 if self.player.centerx < rect.centerx else 200
            vel.y += self.gravity * dt

            self.move_and_collide(rect, vel, dt)

            if rect.colliderect(self.player):
                self.player.topleft = (100, self.game.screen.get_height() - 150)
                self.player_vel = pygame.Vector2(0, 0)

        rect = self.jumping_enemy["rect"]
        vel = self.jumping_enemy["vel"]

        vel.x = 0
        vel.y += self.gravity * dt

        grounded = self.move_and_collide(rect, vel, dt)

        if grounded:
            vel.y = self.jumping_enemy["jump_strength"]

        if rect.colliderect(self.player):
            self.player.topleft = (100, self.game.screen.get_height() - 150)
            self.player_vel = pygame.Vector2(0, 0)

        if self.player.colliderect(self.level_end):
            self.game.change_scene(LevelCompletionScene(self.game))

        for shooter in self.shooters:
            rect = shooter["rect"]

            shooter["cooldown"] -= dt
            if shooter["cooldown"] <= 0:
                direction = -1 if self.player.centerx < rect.centerx else 1
                self.projectiles.append(
                    Projectile(rect.centerx, rect.centery, direction)
                )
                shooter["cooldown"] = 2

            if rect.colliderect(self.player):
                self.player.topleft = (100, self.game.screen.get_height() - 150)
                self.player_vel = pygame.Vector2(0, 0)

        for projectile in self.projectiles[:]:
            projectile.update(dt)

            if projectile.rect.colliderect(self.player):
                self.player.topleft = (100, self.game.screen.get_height() - 150)
                self.player_vel = pygame.Vector2(0, 0)
                self.projectiles.remove(projectile)

            if projectile.rect.x < 0 or projectile.rect.x > 3000:
                self.projectiles.remove(projectile)

        for spike in self.spikes:
            if self.player.colliderect(spike.rect):
                self.player.topleft = (100, self.game.screen.get_height() - 150)
                self.player_vel = pygame.Vector2(0, 0)

    def draw(self, screen):
        screen.fill(colors["sky"])

        for platform in self.platforms:
            pygame.draw.rect(
                screen,
                colors["ground"],
                (platform.rect.x - self.camera_x,
                 platform.rect.y,
                 platform.rect.width,
                 platform.rect.height)
            )

        pygame.draw.rect(
            screen,
            colors["blue"],
            (self.player.x - self.camera_x,
             self.player.y,
             50,
             50)
        )

        for enemy in self.enemies:
            pygame.draw.rect(
                screen,
                colors["red"],
                (enemy["rect"].x - self.camera_x,
                 enemy["rect"].y,
                 50,
                 50)
            )

        pygame.draw.rect(
            screen,
            (255, 0, 255),
            (self.jumping_enemy["rect"].x - self.camera_x,
             self.jumping_enemy["rect"].y,
             50,
             50)
        )

        pygame.draw.rect(
            screen,
            (255, 215, 0),
            (self.level_end.x - self.camera_x,
             self.level_end.y,
             100,
             100)
        )
        for spike in self.spikes:
            spike.draw(screen, self.camera_x)

        for shooter in self.shooters:
            pygame.draw.rect(
                screen,
                colors["green"],
                (shooter["rect"].x - self.camera_x,
                 shooter["rect"].y,
                 50,
                 50)
            )

        for projectile in self.projectiles:
            projectile.draw(screen, self.camera_x)
class LevelCompletionScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        w, h = self.game.screen.get_size()

        self.font = pygame.font.Font(None, 80)

        self.menu_button = Button(
            (w//2 - 150, h//2 + 50, 300, 100),
            "Back to Menu",
            pygame.font.Font(None, 60),
            colors["gray"],
            colors["lightgray"]
        )

    def handle_event(self, event):
        if self.menu_button.is_clicked(event):
            self.game.change_scene(MenuScene(self.game))

    def draw(self, screen):
        screen.fill(colors["black"])

        text = self.font.render("LEVEL COMPLETE!", True, colors["white"])
        screen.blit(text, text.get_rect(center=(screen.get_width()//2, screen.get_height()//2 - 50)))

        self.menu_button.draw(screen)

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