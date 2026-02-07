import pygame as pg

class Debug:
    def __init__(self, game):
        #True to start game with it open
        self.debug_flag = True
        self.game = game
        self.font = pg.font.Font(None, 25)

    def draw(self):
        if self.debug_flag:
            mouse_rate_text = self.font.render(f"Mouse values: ({self.game.mouse_x}, {self.game.mouse_y})", True, 'white')
            self.game.screen.blit(mouse_rate_text, (10, 10))
            
            angle_text = self.font.render(f"Player angle: {self.game.player.angle}",True, 'white')
            self.game.screen.blit(angle_text, (10, 35))

            player_map_pos = self.font.render(f"Player map position: {self.game.player.map_pos}",True, 'white')
            self.game.screen.blit(player_map_pos, (10, 60))

            player_velocity = self.font.render(f"Player velocity: ({self.game.player.dx}, {self.game.player.dy}) ",True, 'white')
            self.game.screen.blit(player_velocity, (10, 85))

            player_velocity_magnitude = self.font.render(f"Magnitude: {(self.game.player.dx ** 2 + self.game.player.dy ** 2) ** (1/2)}",True, 'white')
            self.game.screen.blit(player_velocity_magnitude, (10, 110))

            delta_time = self.font.render(f"Delta Time: {self.game.delta_time}ms",True, 'white')
            self.game.screen.blit(delta_time, (10, 135))