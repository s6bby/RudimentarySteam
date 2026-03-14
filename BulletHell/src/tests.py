import unittest
from unittest.mock import MagicMock
import pygame
import game

class TestGame(unittest.TestCase):

    def setUp(self):
        """
        Set up the global variables that the classes in main.py rely on.
        We mock the screen so we don't need to actually open a Pygame window.
        """
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
        
        # Branch 1: magnitude == 0 (target is the exact same as current position)
        target_same = pygame.Vector2(100, 100)
        glob.path(target_same)
        
        # Assert 8: Position should remain unchanged because the if-statement is skipped
        self.assertEqual(glob.position, pygame.Vector2(100, 100))
        
        # Branch 2: magnitude != 0 (target is different)
        target_diff = pygame.Vector2(100, 200) # Target is directly below
        glob.path(target_diff)
        # Normalization of (0, 100) is (0, 1). 
        # Movement = speed * dt = 30 * 0.5 = 15.
        # New position should be (100, 115).
        
        # Assert 9: Position x remains 100
        self.assertEqual(glob.position.x, 100)
        
        # Assert 10: Position y moved by exactly 15
        self.assertEqual(glob.position.y, 115)

    # ---------------------------------------------------------
    # INTEGRATION TEST
    # ---------------------------------------------------------
    def test_glob_shoot_integration(self):
        """
        INTEGRATION TEST
        Units being tested: Glob class and Bullet class.
        Testing that Glob correctly instantiates a Bullet with the proper relational parameters.
        """
        glob = game.Glob(500, 500)
        target = pygame.Vector2(500, 0) # Target is straight up
        
        # Exercise the units
        bullet = glob.shoot(target)
        
        # Assert 11: shoot() successfully creates an instance of the Bullet unit
        self.assertIsInstance(bullet, game.Bullet)
        
        # Assert 12: The bullet's starting position is successfully inherited from the Glob's position
        self.assertEqual(bullet.position, pygame.Vector2(500, 500))
        
        # Assert 13: The bullet's velocity is calculated correctly based on Glob's target
        # Target is up (0, -500). Normalized direction is (0, -1). 
        # Bullet speed is 200. Velocity should be (0, -200).
        self.assertEqual(bullet.velocity, pygame.Vector2(0, -200))


if __name__ == '__main__':
    unittest.main()
