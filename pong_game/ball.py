import pygame

class Ball:
    def __init__(self, screen_width, screen_height, size=15):  
                                                               
        self.rect = pygame.Rect(0, 0, size, size) # hitbox for the ball 
        self.rect.center = (screen_width // 2, screen_height // 2) 
        self.color = (255, 255, 255) 

        self.speed = 9
        self.velocity = pygame.Vector2(self.speed, 0)

    
        self.rect.x += self.velocity.x  
        self.rect.y += self.velocity.y 


    def update(self):
        self.prev_x = self.rect.x
        self.prev_y = self.rect.y

        self.rect.x += self.velocity.x
        self.rect.y += self.velocity.y

    
  
    def reflect(self, normal):
        self.velocity.reflect_ip(normal) #  the normal tells the ball what direction the surface is facing, and reflect_ip() uses that nromal to calculate the newa reflected velocity. 

    def checkCollisions(self, screen_width, screen_height):
        hit_wall = False

        if self.rect.top <= 0 or self.rect.bottom >= screen_height:
            self.velocity.y *= -1 
        #    hit_wall = True

        if self.rect.left <= 0:
            return "opponent"

        if self.rect.right >= screen_width:
            return "player"

        return None
       # return hit_wall 

    def draw(self, screen):
        pygame.draw.rect(screen, (123, 0, 0), self.rect, 2) # debug hitbox 
        
        pygame.draw.rect(screen, self.color, self.rect) 
        