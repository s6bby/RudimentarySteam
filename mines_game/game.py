import pygame
import random

from board import Board

# all positions for gui were helped with ai
# px : positions are x pos, y pos, width, height 

class Game:
    def __init__(self):
        pygame.init()

        self.width = 1280 
        self.height = 720 
        self.screen = pygame.display.set_mode((self.width, self.height))
        pygame.display.set_caption("Mines")

        self.running = True
        self.clock = pygame.time.Clock() 

        self.board = Board(self.width, self.height)
        self.bombCount = 5
        self.cash = 500
        self.font = pygame.font.Font(None, 44)
        self.smallFont = pygame.font.Font(None, 28)

        self.resetButton = pygame.Rect((self.width // 2) - 260, 20, 70, 50) 
        self.resetButtonColor = (255, 154, 56)

        self.startButton = pygame.Rect((self.width // 2) - 170, 20, 60, 50)
        self.startButtonColor = (33, 87, 59)
        self.startButtonActiveColor = (103, 197, 146)

        self.cashBox = pygame.Rect((self.width // 2) - 90, 20, 180, 50)

        self.betAmount = ""
        self.betBox = pygame.Rect(self.cashBox.right + 20, 20, 260, 50)
        self.betActive = False

        self.cashOutButton = pygame.Rect((self.width // 2) - 100, self.height - 90, 200, 50)
        self.cashOutButtonColor = (33, 87, 59)

        self.roundActive = False
        self.roundBet = 0
        self.safeClicks = 0
        self.multiplierPerCell = 1.5

        self.setupBoard()


    def setupBoard(self):
        for row in self.board.cells:
            for cell in row:
                cell.isRevealed = False
                cell.cellBomb = False

        self.placeBombs()



    def placeBombs(self):
        allCells = []
        for row in self.board.cells:
            for cell in row:
                allCells.append(cell)

        bombCells = random.sample(allCells, self.bombCount)

        for cell in bombCells:
            cell.cellBomb = True



    def drawCash(self):
        pygame.draw.rect(self.screen, (40, 40, 40), self.cashBox)

        cashText = self.font.render("$" + str(self.cash), True, (255, 255, 255))
        self.screen.blit(cashText, (self.cashBox.x + 40, self.cashBox.y + 10))



    def drawStartButton(self):
        buttonColor = self.startButtonActiveColor if self.roundActive else self.startButtonColor

        pygame.draw.rect(self.screen, buttonColor, self.startButton, border_radius=8)

        startText = self.smallFont.render("GO", True, (255, 255, 255))
        self.screen.blit(startText, (self.startButton.x + 16, self.startButton.y + 16))



    def drawResetButton(self):
        pygame.draw.rect(self.screen, self.resetButtonColor, self.resetButton, border_radius=8)

        resetText = self.smallFont.render("RESET", True, (255, 255, 255))
        self.screen.blit(resetText, (self.resetButton.x + 7, self.resetButton.y + 16))



    def drawCashOutButton(self):
        if not self.roundActive:
            return

        pygame.draw.rect(self.screen, self.cashOutButtonColor, self.cashOutButton, border_radius=8)

        cashOutText = self.smallFont.render("CASH OUT", True, (255, 255, 255))
        self.screen.blit(cashOutText, (self.cashOutButton.x + 45, self.cashOutButton.y + 16))



    def startGame(self):
        if self.roundActive:
            return

        if self.betAmount == "":
            return

        betValue = int(self.betAmount)

        if betValue <= 0:
            return

        if betValue > self.cash:
            return

        self.cash -= betValue
        self.roundActive = True
        self.roundBet = betValue
        self.safeClicks = 0
        self.setupBoard()


    def resetGame(self):
        if not self.roundActive:
            self.betAmount = ""
            self.setupBoard()
            return


        self.safeClicks = 0

        for row in self.board.cells:
            for cell in row:
                cell.isRevealed = False



    def endRound(self):
        self.roundActive = False
        self.roundBet = 0
        self.safeClicks = 0
        self.betAmount = ""
        self.betActive = False
        self.setupBoard()



    def cashOut(self):
        if not self.roundActive:
            return

        payout = self.roundBet

        if self.safeClicks > 0:
            payout = int(self.roundBet * (self.safeClicks * self.multiplierPerCell))

        self.cash += payout
        self.endRound()



    def handleBoardClick(self, mousePos):
        if not self.roundActive:
            return

        clickedCell = self.board.handleClick(mousePos)

        if clickedCell is None:
            return

        if clickedCell.cellBomb:
            self.endRound()
            return

        self.safeClicks += 1



    def drawBetBox(self):
        pygame.draw.rect(self.screen, (40, 40, 40), self.betBox)

        if self.betAmount != "":
            displayText = "$" + str(self.betAmount)
            textColor = (255, 255, 255)

        elif self.betActive:
            displayText = "$"
            textColor = (255, 255, 255)
            
        else:
            displayText = "enter bet amount"
            textColor = (170, 170, 170)

        betText = self.smallFont.render(displayText, True, textColor)
        self.screen.blit(betText, (self.betBox.x + 12, self.betBox.y + 16))



    def run(self):
        while self.running:
            self.clock.tick(60)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False

                if event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 1:

                        if self.resetButton.collidepoint(event.pos):
                            self.resetGame()
                            self.betActive = False
                            
                        elif self.cashOutButton.collidepoint(event.pos) and self.roundActive:
                            self.cashOut()

                        elif self.startButton.collidepoint(event.pos):
                            self.startGame()
                            self.betActive = False

                        elif self.betBox.collidepoint(event.pos):
                            self.betActive = True

                        else:
                            self.betActive = False
                            self.handleBoardClick(event.pos)

                if event.type == pygame.KEYDOWN and self.betActive:
                    if event.key == pygame.K_BACKSPACE:
                        self.betAmount = self.betAmount[:-1]
                    elif event.unicode.isdigit():
                        self.betAmount += event.unicode


            self.screen.fill((0, 0, 0))

            self.board.update()
            self.board.draw(self.screen)
            self.drawResetButton()
            self.drawStartButton()
            self.drawCash()
            self.drawBetBox()
            self.drawCashOutButton()

            pygame.display.flip()

        pygame.quit()