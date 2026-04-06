import pygame

class Paddle:
    def __init__(self, x, screen_height, image_path):

        self.image = pygame.image.load(image_path).convert_alpha()

        self.image = pygame.transform.scale(self.image, (128,128))

        self.rect = self.image.get_rect()
        self.rect.left = x 
        self.rect.centery = screen_height // 2 

        self.mask = pygame.mask.from_surface(self.image)
        
    # DEFAULT PADDLES. 
       # self.rect = pygame.Rect(0, 0, width, height)
       # self.rect.x = x
       # self.rect.centery = screen_height // 2
       # self.color = (255, 255, 255)
    
   

    def draw(self, screen):
       # pygame.draw.rect(screen, (0, 255, 0), self.rect, 2) # debug hitbox
        
        screen.blit(self.image, self.rect) 

        