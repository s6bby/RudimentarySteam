import unittest
from game import Game
from ball import Ball


class PongTests(unittest.TestCase):

    def testGameReset(self):  
        # Black box unit test
        # Check the outputs (positions and velocity) after calling gameReset

        game = Game()   

        game.gameReset() 

        self.assertEqual(game.ball.rect.center, (game.width//2, game.height//2))

        self.assertEqual(game.player.rect.centery, game.height//2)

        self.assertEqual(game.opponent.rect.centery, game.height//2)

        self.assertEqual(game.ball.velocity.x, 6)


    def testPaddleMovement(self):
        # Black box unit test
        # checks player and opponent paddle movement

        game = Game()

        # Player paddle up
        pastPlayerY = game.player.rect.y
        game.movePlayerUp()
        self.assertEqual(game.player.rect.y, pastPlayerY - 9)

        # Player paddle down
        pastPlayerY = game.player.rect.y
        game.movePlayerDown()
        self.assertEqual(game.player.rect.y, pastPlayerY + 9)

        # Opponent paddle up
        pastOpponentY = game.opponent.rect.y
        game.moveOpponentUp()
        self.assertEqual(game.opponent.rect.y, pastOpponentY - 9)

        # Opponent paddle down
        pastOpponentY = game.opponent.rect.y
        game.moveOpponentDown()
        self.assertEqual(game.opponent.rect.y, pastOpponentY + 9)


    def testcheckCollisions(self):
        # White box unit test
        # top collision, bottom collision, left scoring, and right scoring are tested

            # Function tested.
                # def checkCollisions(self, screen_width, screen_height):
                #    hit_wall = False

                #    if self.rect.top <= 0 or self.rect.bottom >= screen_height:
                #        self.velocity.y *= -1 
                #    #    hit_wall = True

                #    if self.rect.left <= 0:
                #        return "opponent"

                #    if self.rect.right >= screen_width:
                #        return "player"

                #    return None
                #   # return hit_wall 

        # ball velocity will reflect the speed it began with, in this case 5, and will check for -5 when it collides 

        ball = Ball(1280,720)
        width = 1280
        height = 720

        # Top collision flips velocity
        ball.rect.top = -1
        ball.velocity.y = 5
        ball.checkCollisions(width,height)
        self.assertEqual(ball.velocity.y, -5)

        # Bottom collision flips velocity
        ball.rect.bottom = height + 1
        ball.velocity.y = -5
        ball.checkCollisions(width,height)
        self.assertEqual(ball.velocity.y, 5)


        # left post at 0 ---- right post is at 1280
            # move -10 left. (should be scoring condition)
            # move +10 right (should be scoring condition)


        # Left side scores opponent
        ball.rect.left = -10 
        self.assertEqual(ball.checkCollisions(width,height), "opponent")

        # Right side scores player
        ball.rect.right = width + 10
        self.assertEqual(ball.checkCollisions(width,height), "player")



    def testScoreLogic(self):
        # Integration test
        # tests Ball.checkCollisions and Game scoring

        game = Game()

        # Player scores
        game.ball.rect.right = game.width + 10
        collision = game.ball.checkCollisions(game.width, game.height)
        game.updateScore(collision)

        self.assertEqual(collision, "player")
        self.assertEqual(game.playerScore, 1)

        # reset state before next scoring case
        game.ball.rect.center = (game.width // 2, game.height // 2)

        # Opponent scores
        game.ball.rect.left = -10
        collision = game.ball.checkCollisions(game.width, game.height)
        game.updateScore(collision)

        self.assertEqual(collision, "opponent")
        self.assertEqual(game.opponentScore, 1)


    


if __name__ == "__main__":
    unittest.main()       