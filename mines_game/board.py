from cell import Cell


class Board:
    def __init__(self, screenWidth, screenHeight, rows=5, cols=5, cellSize=96, gap=12):
        self.screenWidth = screenWidth
        self.screenHeight = screenHeight
        self.rows = rows
        self.cols = cols
        self.cellSize = cellSize
        self.gap = gap

        totalWidth = (self.cols * self.cellSize) + ((self.cols - 1) * self.gap)
        totalHeight = (self.rows * self.cellSize) + ((self.rows - 1) * self.gap)

        self.offsetX = (self.screenWidth - totalWidth) // 2
        self.offsetY = (self.screenHeight - totalHeight) // 2

        self.cells = []

        for row in range(self.rows):
            currentRow = []

            for col in range(self.cols):
                x = self.offsetX + (col * (self.cellSize + self.gap))
                y = self.offsetY + (row * (self.cellSize + self.gap))
                currentRow.append(Cell(x, y, self.cellSize))

            self.cells.append(currentRow)

    def update(self):
        pass

    def handleClick(self, mousePos):
        for row in self.cells:
            for cell in row:
                if cell.rect.collidepoint(mousePos):
                    cell.reveal()

    def draw(self, screen):
        for row in self.cells:
            for cell in row:
                cell.draw(screen)
