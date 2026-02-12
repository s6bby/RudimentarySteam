import pygame

colors = {
    "black": (0, 0, 0),
    "white": (255, 255, 255),
    "red": (255, 0, 0),
    "green": (0, 255, 0),
    "blue": (0, 0, 255),
    "shoppurple": (94, 76, 224),
    "mainmenured": (224, 94, 76),
    "yellow": (255, 255, 0),
    "orange": (255, 165, 0),
    "purple": (128, 0, 128),
    "pink": (255, 192, 203),
    "cyan": (0, 255, 255),
    "magenta": (255, 0, 255),
    "gray": (128, 128, 128),
    "lightgray": (200, 200, 200)
}

class Explosion:
    def __init__(self, pos):
        self.pos = pygame.Vector2(pos)
        self.radius = 5
        self.max_radius = 60
        self.growth_speed = 300
        self.alpha = 255

    def update(self, dt):
        self.radius += self.growth_speed * dt
        self.alpha -= 400 * dt
        if self.alpha < 0:
            self.alpha = 0

    def draw(self, screen):
        if self.alpha <= 0:
            return

        surface = pygame.Surface((150, 150), pygame.SRCALPHA)
        pygame.draw.circle(
            surface,
            (255, 200, 50, int(self.alpha)),
            (75, 75),
            int(self.radius)
        )
        screen.blit(surface, (self.pos.x - 75, self.pos.y - 75))

    def finished(self):
        return self.alpha <= 0 or self.radius >= self.max_radius


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
        text_rect = text_surface.get_rect(center=self.rect.center)
        screen.blit(text_surface, text_rect)

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
        screen_width = self.game.screen.get_width()
        screen_height = self.game.screen.get_height()

        self.title_font = pygame.font.Font(None, int(screen_height * 0.12))
        self.font = pygame.font.Font(None, int(screen_height * 0.05))

        self.title_text = self.title_font.render("Click Game", True, colors["white"])
        self.title_rect = self.title_text.get_rect(center=(screen_width // 2, screen_height // 6))

        self.button_padding_x = 20
        self.button_padding_y = 10
        self.spacing = screen_height * 0.03

        button_texts = ["Play", "Shop", "Quit"]
        self.buttons = []
        start_y = screen_height // 2

        for i, text in enumerate(button_texts):
            center_y = start_y + i * (self.font.get_height() + self.spacing)
            button = self.create_button(text, screen_width // 2, center_y)
            self.buttons.append(button)

    def create_button(self, text, center_x, center_y):
        text_surface = self.font.render(text, True, colors["black"])
        text_width, text_height = text_surface.get_size()

        button_width = text_width + self.button_padding_x * 2
        button_height = text_height + self.button_padding_y * 2

        rect = (
            int(center_x - button_width / 2),
            int(center_y - button_height / 2),
            int(button_width),
            int(button_height)
        )

        return Button(rect, text, self.font, colors["gray"], colors["lightgray"])

    def handle_event(self, event):
        for button in self.buttons:
            if button.is_clicked(event):
                if button.text == "Play":
                    self.game.change_scene(GameScene(self.game))
                elif button.text == "Shop":
                    self.game.change_scene(ShopScene(self.game))
                elif button.text == "Quit":
                    self.game.running = False

    def draw(self, screen):
        screen.fill(colors["mainmenured"])
        screen.blit(self.title_text, self.title_rect)
        for button in self.buttons:
            button.draw(screen)


class GameScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        screen_width = self.game.screen.get_width()
        screen_height = self.game.screen.get_height()

        self.timer = 20
        self.timer_font = pygame.font.Font(None, int(screen_height * 0.05))
        self.font = pygame.font.Font(None, int(screen_height * 0.05))

        button_width = screen_width * 0.08
        button_height = screen_height * 0.06
        button_margin = screen_width * 0.01

        self.back_button = Button(
            (button_margin, button_margin, button_width, button_height),
            "Back",
            self.font,
            colors["gray"],
            colors["lightgray"]
        )

        self.targets = [
            {
                "rect": pygame.Rect(screen_width // 3, screen_height // 3, 200, 200),
                "vel": pygame.Vector2(350, 280),
                "color": colors["red"],
                "original_color": colors["red"]
            },
            {
                "rect": pygame.Rect(screen_width // 2, screen_height // 2, 150, 150),
                "vel": pygame.Vector2(200, 400),
                "color": colors["blue"],
                "original_color": colors["blue"]
            },
        ]

        self.message = "Click the squares!"
        self.message_timer = 0
        self.click_count = 0
        self.explosions = []

    def handle_event(self, event):
        if self.back_button.is_clicked(event):
            self.game.change_scene(MenuScene(self.game))

        for target in self.targets:
            if (
                event.type == pygame.MOUSEBUTTONDOWN
                and event.button == 1
                and target["rect"].collidepoint(event.pos)
                and target["color"] != colors["green"]
            ):
                target["color"] = colors["green"]
                self.message = "Nice hit!"
                self.message_timer = 0.75
                self.click_count += 1
                self.game.coins += 2

                if self.game.explosion_bought:
                    self.explosions.append(Explosion(event.pos))
                    self.game.explosion_sound.play()

    def update(self, dt):
        screen_width = self.game.screen.get_width()
        screen_height = self.game.screen.get_height()

        self.timer -= dt
        if self.timer <= 0:
            self.game.change_scene(LevelCompletionScene(self.game))

        for target in self.targets:
            target["rect"].x += target["vel"].x * dt
            target["rect"].y += target["vel"].y * dt

            if target["rect"].left < 0 or target["rect"].right > screen_width:
                target["vel"].x *= -1
            if target["rect"].top < 0 or target["rect"].bottom > screen_height:
                target["vel"].y *= -1

        if self.message_timer > 0:
            self.message_timer -= dt
            if self.message_timer <= 0:
                self.message = ""
                for target in self.targets:
                    if target["color"] == colors["green"]:
                        target["color"] = target["original_color"]

        for explosion in self.explosions[:]:
            explosion.update(dt)
            if explosion.finished():
                self.explosions.remove(explosion)

    def draw(self, screen):
        screen.fill(colors["black"])
        self.back_button.draw(screen)

        timer_surface = self.timer_font.render(f"Time: {int(self.timer)}", True, colors["white"])
        screen.blit(timer_surface, (screen.get_width() * 0.85, screen.get_height() * 0.02))

        for target in self.targets:
            pygame.draw.rect(screen, target["color"], target["rect"])

        for explosion in self.explosions:
            explosion.draw(screen)

        if self.message:
            text_surface = self.font.render(self.message, True, colors["white"])
            text_rect = text_surface.get_rect(center=(screen.get_width() // 2, int(screen.get_height() * 0.75)))
            screen.blit(text_surface, text_rect)

        screen.blit(self.font.render(f"Hits: {self.click_count}", True, colors["white"]),
                    (screen.get_width() * 0.01, screen.get_height() * 0.08))
        screen.blit(self.font.render(f"Coins: {self.game.coins}", True, colors["yellow"]),
                    (screen.get_width() * 0.01, screen.get_height() * 0.15))


class ShopScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        screen_width = self.game.screen.get_width()
        screen_height = self.game.screen.get_height()

        self.title_font = pygame.font.Font(None, int(screen_height * 0.12))
        self.font = pygame.font.Font(None, int(screen_height * 0.05))

        self.title_text = self.title_font.render("Shop", True, colors["white"])
        self.title_rect = self.title_text.get_rect(center=(screen_width // 2, screen_height // 11))

        self.button_padding_x = 20
        self.button_padding_y = 10

        self.back_button = self.create_button("Back", screen_width * 0.05, screen_height * 0.05)

        text = "Explosions (Bought)" if self.game.explosion_bought else "Explosions on hit (20 coins)"
        self.explosion_button = self.create_button(text, screen_width // 2, screen_height // 2)

        self.buttons = [self.back_button, self.explosion_button]

    def create_button(self, text, center_x, center_y):
        text_surface = self.font.render(text, True, colors["black"])
        w, h = text_surface.get_size()
        rect = (
            int(center_x - (w + self.button_padding_x * 2) / 2),
            int(center_y - (h + self.button_padding_y * 2) / 2),
            int(w + self.button_padding_x * 2),
            int(h + self.button_padding_y * 2)
        )
        return Button(rect, text, self.font, colors["gray"], colors["lightgray"])

    def handle_event(self, event):
        if self.back_button.is_clicked(event):
            self.game.change_scene(MenuScene(self.game))

        if not self.game.explosion_bought and self.explosion_button.is_clicked(event):
            if self.game.coins >= 20:
                self.game.coins -= 20
                self.game.explosion_bought = True
                self.explosion_button.text = "Explosions (Bought)"

    def draw(self, screen):
        screen.fill(colors["shoppurple"])
        screen.blit(self.title_text, self.title_rect)
        for button in self.buttons:
            button.draw(screen)
        screen.blit(self.font.render(f"Coins: {self.game.coins}", True, colors["yellow"]),
                    (screen.get_width() * 0.01, screen.get_height() * 0.15))


class LevelCompletionScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        screen_width = self.game.screen.get_width()
        screen_height = self.game.screen.get_height()

        self.title_font = pygame.font.Font(None, int(screen_height * 0.12))
        self.font = pygame.font.Font(None, int(screen_height * 0.05))

        self.title_text = self.title_font.render("Level Completed!", True, colors["white"])
        self.title_rect = self.title_text.get_rect(center=(screen_width // 2, screen_height // 11))

        button_width = screen_width * 0.08
        button_height = screen_height * 0.06
        button_margin = screen_width * 0.01

        self.back_button = Button(
            (button_margin, button_margin, button_width, button_height),
            "Back",
            self.font,
            colors["gray"],
            colors["lightgray"]
        )

    def handle_event(self, event):
        if self.back_button.is_clicked(event):
            self.game.change_scene(MenuScene(self.game))

    def draw(self, screen):
        screen.fill(colors["red"])
        screen.blit(self.title_text, self.title_rect)
        self.back_button.draw(screen)


class Game:
    def __init__(self, width=1920, height=1080):
        pygame.init()
        pygame.mixer.init()
        pygame.mixer.set_num_channels(16)

        self.screen = pygame.display.set_mode((width, height))
        pygame.display.set_caption("Click Game")
        self.clock = pygame.time.Clock()
        self.running = True

        self.coins = 0
        self.explosion_bought = False

        self.explosion_sound = pygame.mixer.Sound("Assets/explosion.wav")
        self.explosion_sound.set_volume(0.4)

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
