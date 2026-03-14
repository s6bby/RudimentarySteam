import unittest
from unittest.mock import MagicMock
import pygame
import game

class TestGame(unittest.TestCase):

    def setUp(self):
        #Mock globals
        game.screen = MagicMock()
        game.screen.get_width.return_value = 1920
        game.screen.get_height.return_value = 1080
        game.dt = 0.5   #use const dt
        game.settings = game.Settings()

# BLACK BOX UNIT TEST
    def test_bullet_update_bounds(self):
        #Bullet movement/OOB
        bullet = game.Bullet((1000, 500), (1100, 500)) 
        
        # update() true when bullet onscreen
        self.assertTrue(bullet.update())
        
        # Check new position
        self.assertEqual(bullet.position.x, 1100)
        self.assertEqual(bullet.position.y, 500)
        
        # OOB test left
        bullet.position = pygame.Vector2(-2000, 2000)
        self.assertFalse(bullet.update())
        
        # OOB test right
        bullet.position = pygame.Vector2(2000, 500)
        self.assertFalse(bullet.update())
        
        # OOB test top
        bullet.position = pygame.Vector2(1000, -10)
        self.assertFalse(bullet.update())
        
        # OOB test bottom
        bullet.position = pygame.Vector2(1000, 1500)
        self.assertFalse(bullet.update())

# WHITE BOX UNIT TEST
    def test_glob_path_coverage(self):
        #Branch coverage
        #Testing Glob.path
        glob = game.Glob(100, 100)
        glob.speed = 30
        
        # Branch 1: magnitude == 0 
        target_same = pygame.Vector2(100, 100)
        glob.path(target_same)
        
        # Position should remain unchanged
        self.assertEqual(glob.position, pygame.Vector2(100, 100))
        
        # Branch 2: magnitude != 0
        target_diff = pygame.Vector2(100, 200) # Target is directly below
        glob.path(target_diff)
        
        # x remains 100
        self.assertEqual(glob.position.x, 100)
        
        # y moved by 15
        self.assertEqual(glob.position.y, 115)

# INTEGRATION TEST
    def test_glob_shoot_integration(self):
        #Testing Glob and Bullet class
        """def path(self,targetposition):
        length = targetposition - self.position
        if length.magnitude() != 0:
            length.normalize_ip()
            self.position += length * self.speed * dt"""
        glob = game.Glob(500, 500)
        target = pygame.Vector2(500, 0) # Target is straight up
        
        bullet = glob.shoot(target)
        
        #shoot() successfully creates an instance of the Bullet unit
        self.assertIsInstance(bullet, game.Bullet)
        
        # The bullet's starting position is successfully inherited from the Glob's position
        self.assertEqual(bullet.position, pygame.Vector2(500, 500))
        
        # Bullet's velocity is calculated correctly based on Glob's target
        self.assertEqual(bullet.velocity, pygame.Vector2(0, -200))


if __name__ == '__main__':
    unittest.main(verbosity=2)
