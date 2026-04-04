import pygame
from settings import settings
class Entity:
    def __init__(self, xpos, ypos):
        self.position = pygame.Vector2(xpos, ypos)
    def update(self, screen, dt):
        pass
    def draw(self, screen):
        pass


class Player(Entity):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.radius = 70 
        self.speed = 100
        self.health = 100
        self.bullets = []
        self.shootTimer = 0
        self.healthTimer = 0
        self.settings = settings
        self.color = settings.theme["player"]

    def update(self, screen, dt, enemies):       
        self.move(dt)
        self.checkCollisions(enemies, screen, dt)
        self.shoot(screen, dt)         

    def checkCollisions(self, enemies, screen, dt):
        self.healthTimer += dt
        if self.position.x - self.radius < 0:
            self.position.x = self.radius
        if self.position.x + self.radius > screen.get_width():
            self.position.x = screen.get_width() - self.radius
        if self.position.y - self.radius < 0:
            self.position.y = self.radius
        if self.position.y + self.radius > screen.get_height():
            self.position.y = screen.get_height() - self.radius


        for enemy in enemies:
            distance = self.position.distance_to(enemy.position)     
            if distance < (self.radius + 50) and self.healthTimer >= 1/3:
                self.health -= 10
                self.healthTimer = 0
    def shoot(self, screen, dt):
        keysPressed = pygame.key.get_pressed()
        self.shootTimer += dt
        if keysPressed[pygame.K_SPACE] and self.shootTimer >= 0.25:
            self.shootTimer = 0
            self.bullets.append(Bullet(self.position, pygame.mouse.get_pos()))
        for bullet in self.bullets[:]:
            if not bullet.update(screen, dt):
                self.bullets.remove(bullet)
            else:
                bullet.draw(screen)
    def move(self, dt):
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
        font = pygame.font.SysFont(None, 36)
        healthText = font.render(f"Health: {self.health}", True, self.color)
        screen.blit(healthText, (10, 50))
        

class Enemy(Entity):
    def path(self, targetposition):
        pass

class Glob(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 30
        self.bullets = []
        self.shootTimer = 0
    def update(self, targetposition, screen, dt):
        self.path(targetposition, dt)
        self.shootTimer += dt
        if self.shootTimer >= 1:
            self.shootTimer = 0
            self.bullets.append(self.shoot(targetposition))
        for bullet in self.bullets[:]:
            if not bullet.update(screen, dt):
                self.bullets.remove(bullet)
            else:
                bullet.draw(screen)
    def draw(self, screen):
        pygame.draw.circle(screen, "red", self.position, 50)
    def path(self,targetposition, dt):
        length = targetposition - self.position
        if length.magnitude() != 0:
            length.normalize_ip()
            self.position += length * self.speed * dt
    def shoot(self, targetposition):
        return Bullet(self.position, targetposition)

class Bullet(Entity):
    def __init__(self, position, targetposition):
        super().__init__(position[0], position[1])
        self.speed = 200
        travelVector = pygame.Vector2(targetposition - self.position)
        if travelVector.magnitude() != 0:
            travelVector.normalize_ip()
            self.velocity = pygame.Vector2(travelVector * self.speed)
    def update(self, screen, dt):
        self.position += self.velocity * dt
        if self.position.x > screen.get_width() or self.position.x < 0 or self.position.y > screen.get_height() or self.position.y < 0:
            return False
        return True
    def draw(self, screen):
        pygame.draw.circle(screen, settings.theme["bullet"], self.position, 10)
