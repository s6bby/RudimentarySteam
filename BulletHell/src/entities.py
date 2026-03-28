import pygame
from settings import settings, themes

class Player:
    def __init__(self,xpos,ypos):
        self.position = pygame.Vector2(xpos, ypos)
        self.speed = 100
        self.health = 100
        self.bullets = []
        self.shootTimer = 0
        self.settings = settings
        self.color = settings.theme["player"]
    def update(self):       
        self.move()
        self.checkCollisions()
        self.draw()  
        self.shoot()         
    def shoot(self):
        keysPressed = pygame.key.get_pressed()
        self.shootTimer += dt
        if keysPressed[pygame.K_SPACE] and self.shootTimer >= 0.25:
            self.shootTimer = 0
            self.bullets.append(Bullet(self.position, pygame.mouse.get_pos()))
        for bullet in self.bullets[:]:
            if not bullet.update():
                self.bullets.remove(bullet)
            else:
                bullet.draw()
    def checkCollisions(self):
        pass        #TODO
    def move(self):
        velocity = pygame.Vector2(0, 0)
        keysPressed = pygame.key.get_pressed()
        if keysPressed[pygame.K_w]:
            velocity.y -= 1
        if keysPressed[pygame.K_s]:
            velocity.y += 1
        if keysPressed[pygame.K_a]:
            velocity.x -= 1
        if keysPressed[pygame.K_d]:
            velocity.x += 1
        #Normalize the vector to account for diagonal speed increase
        if velocity.magnitude() != 0:    
            velocity.normalize_ip() 
            self.position += velocity * self.speed * dt
    def draw(self, screen):
        pygame.draw.circle(screen, self.color, self.position, 70)
        

class Enemy:
    def __init__(self, xpos, ypos):
        self.position = pygame.Vector2(xpos, ypos)
    def update(self, targetposition):
        pass
    def draw(self):
        pass
    def path(self, targetposition):
        pass

class Glob(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 30
        self.bullets = []
        self.shootTimer = 0
    def update(self, targetposition):
        self.path(targetposition)
        self.draw()
        self.shootTimer += dt
        if self.shootTimer >= 1:
            self.shootTimer = 0
            self.bullets.append(self.shoot(targetposition))
        for bullet in self.bullets[:]:
            if not bullet.update():
                self.bullets.remove(bullet)
            else:
                bullet.draw()
    def draw(self, screen):
        pygame.draw.circle(screen, "red", self.position, 50)
    def path(self,targetposition):
        length = targetposition - self.position
        if length.magnitude() != 0:
            length.normalize_ip()
            self.position += length * self.speed * dt
    def shoot(self, targetposition):
        return Bullet(self.position, targetposition)

class Bullet:
    def __init__(self, position, targetposition):
        self.position = pygame.Vector2(position)
        self.speed = 200
        travelVector = pygame.Vector2(targetposition - self.position)
        if travelVector.magnitude() != 0:
            travelVector.normalize_ip()
            self.velocity = pygame.Vector2(travelVector * self.speed)
    def update(self):
        self.position += self.velocity * dt
        if self.position.x > screen.get_width() or self.position.x < 0 or self.position.y > screen.get_height() or self.position.y < 0:
            return False
        return True
    def draw(self, screen):
        pygame.draw.circle(screen, settings.theme["bullet"], self.position, 10)
