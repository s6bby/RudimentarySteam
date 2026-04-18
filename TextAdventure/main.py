import pygame
pygame.init()

colors = {
    "black": (0, 0, 0),
    "white": (255, 255, 255),
    "gray": (150, 150, 150),
    "lightgray": (200, 200, 200),
    "blue": (100, 150, 255)
}

class Button:
    def __init__(self, rect, text, font):
        self.rect = pygame.Rect(rect)
        self.text = text
        self.font = font

    def draw(self, screen):
        hovered = self.rect.collidepoint(pygame.mouse.get_pos())
        color = colors["lightgray"] if hovered else colors["gray"]

        pygame.draw.rect(screen, color, self.rect)
        text_surface = self.font.render(self.text, True, colors["black"])
        screen.blit(text_surface, text_surface.get_rect(center=self.rect.center))

    def clicked(self, event):
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

class MenuScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        w, h = game.screen.get_size()
        font = pygame.font.Font(None, 60)

        self.play_button = Button((w//2 - 150, h//2, 300, 80), "Start Game", font)

    def handle_event(self, event):
        if self.play_button.clicked(event):
            self.game.change_scene(StatSelectScene(self.game))

    def draw(self, screen):
        screen.fill(colors["black"])
        self.play_button.draw(screen)

class StatSelectScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        w, h = game.screen.get_size()
        self.font = pygame.font.Font(None, 40)

        self.stats = {
            "Strength": 1,
            "Endurance": 1,
            "Charisma": 1
        }

        self.buttons = []
        y = 200
        for stat in self.stats:
            self.buttons.append((stat, Button((w//2 - 150, y, 300, 50), f"+ {stat}", self.font)))
            y += 70

        self.start_button = Button((w//2 - 150, y + 50, 300, 60), "Continue", self.font)

    def handle_event(self, event):
        for stat, button in self.buttons:
            if button.clicked(event):
                self.stats[stat] += 1

        if self.start_button.clicked(event):
            self.game.player_stats = self.stats
            self.game.change_scene(DialogueScene(self.game))

    def draw(self, screen):
        screen.fill(colors["black"])

        y = 100
        for stat, value in self.stats.items():
            text = self.font.render(f"{stat}: {value}", True, colors["white"])
            screen.blit(text, (50, y))
            y += 40

        for _, button in self.buttons:
            button.draw(screen)

        self.start_button.draw(screen)

class DialogueScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        self.font = pygame.font.Font(None, 36)

        self.dialogue = {
            "start": {
                "text": "You meet a stranger. What do you do?",
                "choices": [
                    ("Talk to them", "talk"),
                    ("Ignore them", "ignore")
                ]
            },
            "talk": {
                "text": "They seem friendly.",
                "choices": [
                    ("Ask for help", "fight"),
                    ("Leave", "end")
                ]
            },
            "ignore": {
                "text": "You walk away safely.",
                "choices": [
                    ("Continue", "end")
                ]
            },
            "fight": {
                "text": "They suddenly attack you!",
                "choices": [
                    ("Fight back", "combat")
                ]
            },
            "end": {
                "text": "End.",
                "choices": []
            }
        }

        self.current_node = "start"
        self.buttons = []
        self.update_buttons()

    def update_buttons(self):
        self.buttons.clear()
        choices = self.dialogue[self.current_node]["choices"]

        y = 400
        for text, target in choices:
            btn = Button((100, y, 400, 50), text, self.font)
            self.buttons.append((btn, target))
            y += 70

    def handle_event(self, event):
        for btn, target in self.buttons:
            if btn.clicked(event):
                if target == "combat":
                    self.game.change_scene(CombatScene(self.game))
                else:
                    self.current_node = target
                    self.update_buttons()

    def draw(self, screen):
        screen.fill(colors["black"])

        text = self.dialogue[self.current_node]["text"]
        rendered = self.font.render(text, True, colors["white"])
        screen.blit(rendered, (100, 200))

        for btn, _ in self.buttons:
            btn.draw(screen)

class CombatScene(Scene):
    def __init__(self, game):
        super().__init__(game)
        self.font = pygame.font.Font(None, 36)

        self.player_hp = 30
        self.player_stats = game.player_stats

        self.enemy_hp = 25
        self.enemy_name = "Stranger"

        self.message = "The stranger turns hostile!"
        self.reduced_damage = False

        self.buttons = []
        self.create_buttons()

    def create_buttons(self):
        self.buttons = [
            (Button((100, 450, 300, 50), "Attack", self.font), "attack"),
            (Button((100, 520, 300, 50), "Defend", self.font), "defend")
        ]

    def handle_event(self, event):
        for btn, action in self.buttons:
            if btn.clicked(event):
                if action == "attack":
                    self.player_attack()
                elif action == "defend":
                    self.defend()

                if self.enemy_hp > 0:
                    self.enemy_turn()

                self.check_end()

    def player_attack(self):
        damage = self.player_stats["Strength"] * 2
        self.enemy_hp -= damage
        self.message = f"You hit for {damage} damage!"

    def defend(self):
        self.message = "You brace for impact (reduced damage)."
        self.reduced_damage = True

    def enemy_turn(self):
        base_damage = 5


        endurance = self.player_stats.get("Endurance", 1)
        damage = max(1, base_damage - endurance)

        if self.reduced_damage:
            damage = max(1, damage - 3)
            self.reduced_damage = False

        self.player_hp -= damage
        self.message += f" Enemy hits for {damage}!"

    def check_end(self):
        if self.player_hp <= 0:
            self.game.change_scene(EndScene(self.game, "You lost..."))
        elif self.enemy_hp <= 0:
            self.game.change_scene(EndScene(self.game, "You won!"))

    def draw(self, screen):
        screen.fill(colors["black"])

        player_text = self.font.render(f"Player HP: {self.player_hp}", True, colors["white"])
        enemy_text = self.font.render(f"{self.enemy_name} HP: {self.enemy_hp}", True, colors["white"])

        screen.blit(player_text, (100, 100))
        screen.blit(enemy_text, (100, 150))

        msg = self.font.render(self.message, True, colors["white"])
        screen.blit(msg, (100, 250))

        for btn, _ in self.buttons:
            btn.draw(screen)

class EndScene(Scene):
    def __init__(self, game, result_text):
        super().__init__(game)
        self.font = pygame.font.Font(None, 50)
        self.text = result_text

        self.restart_button = Button((350, 400, 300, 80), "Restart", self.font)

    def handle_event(self, event):
        if self.restart_button.clicked(event):
            self.game.change_scene(MenuScene(self.game))

    def draw(self, screen):
        screen.fill(colors["black"])

        text_surface = self.font.render(self.text, True, colors["white"])
        screen.blit(text_surface, (350, 200))

        self.restart_button.draw(screen)

class Game:
    def __init__(self):
        self.screen = pygame.display.set_mode((1000, 700))
        pygame.display.set_caption("Text Adventure")

        self.clock = pygame.time.Clock()
        self.running = True

        self.player_stats = {}
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