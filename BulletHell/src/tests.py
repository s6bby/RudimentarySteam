import unittest
import game

class TestPlayer(unittest.TestCase):
    def test_player_initialization(self):
        player = game.Player(0, 0)
        self.assertEqual(player.position, (0, 0))
        
        
