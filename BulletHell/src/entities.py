import math
import random

import pygame
from settings import settings
class Entity:
    def __init__(self, xpos, ypos):
        self.position = pygame.Vector2(xpos, ypos)
    def update(self, targetposition, screen, dt, entityManager):
        pass
    def draw(self, screen, camera):
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

    def update(self, targetposition, screen, dt, entityManager):
        self.move(dt)
        self.checkCollisions(entityManager, screen, dt)
        self.shoot(screen, dt, entityManager)

    def checkCollisions(self, entityManager, screen, dt):
        self.healthTimer += dt
        if self.position.x - self.radius < -5000:
            self.position.x = self.radius
        if self.position.x + self.radius > screen.get_width() + 5000:
            self.position.x = screen.get_width() - self.radius
        if self.position.y - self.radius < -5000:
            self.position.y = self.radius
        if self.position.y + self.radius > screen.get_height() + 5000:
            self.position.y = screen.get_height() - self.radius

        
        for enemy in entityManager.entities:
            if isinstance(enemy, Enemy)and not isinstance(enemy, PlayerBullet):
                distance = self.position.distance_to(enemy.position)     
                if distance < (self.radius + enemy.radius) and self.healthTimer >= 1/3:
                    self.health -= 10
                    self.healthTimer = 0
                    if isinstance(enemy, Bullet):
                        entityManager.remove(enemy)
    def shoot(self, screen, dt, entityManager):
        keysPressed = pygame.key.get_pressed()
        self.shootTimer += dt
        if keysPressed[pygame.K_SPACE] and self.shootTimer >= 0.25:
            self.shootTimer = 0
            entityManager.add(PlayerBullet(self.position, entityManager.mouse_world_pos))
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
    def draw(self, screen, camera):
        pygame.draw.circle(screen, self.color, camera.apply(self), 70)
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
        self.radius = 50
        self.health = 30
    def update(self, targetposition, screen, dt, entityManager):
        self.path(targetposition, dt)
        self.checkCollisions(entityManager, screen, dt)
        self.shootTimer += dt
        if self.health <= 0:
            entityManager.remove(self)
        if self.shootTimer >= 1:
            self.shootTimer = 0
            entityManager.add(self.shoot(targetposition))
    def draw(self, screen, camera):
        pygame.draw.circle(screen, "red", camera.apply(self), 50)
    def path(self,targetposition, dt):
        length = targetposition - self.position
        if length.magnitude() != 0:
            length.normalize_ip()
            self.position += length * self.speed * dt
    def checkCollisions(self, entityManager, screen, dt):
        for bullet in entityManager.entities:
            if isinstance(bullet, PlayerBullet):
                distance = self.position.distance_to(bullet.position)     
                if distance < (self.radius + bullet.radius):
                    self.health -= 10
                    entityManager.remove(bullet)
    def shoot(self, targetposition):
        return Bullet(self.position, targetposition)

class Bullet(Enemy):
    def __init__(self, position, targetposition):
        super().__init__(position[0], position[1])
        self.speed = 200
        self.radius = 10
        travelVector = pygame.Vector2(targetposition - self.position)
        self.color = settings.theme["bullet"]
        if travelVector.magnitude() != 0:
            travelVector.normalize_ip()
            self.velocity = pygame.Vector2(travelVector * self.speed)
    def update(self, targetposition, screen, dt, entityManager):
        self.position += self.velocity * dt
        if self.position.x > screen.get_width() or self.position.x < 0 or self.position.y > screen.get_height() or self.position.y < 0:
            entityManager.remove(self)    
    def draw(self, screen, camera):
        pygame.draw.circle(screen, self.color, camera.apply(self), 10)

class PlayerBullet(Bullet):
    def __init__(self, position, targetposition):
        super().__init__(position, targetposition)
        self.color = settings.theme["player_bullet"]
        
        
        

        
class GlobSpawner(Entity):
    def __init__(self, entityManager):
        self.spawnTimer = 0
        self.entityManager = entityManager
    def update(self, targetposition, screen, dt, entityManager):
        self.spawnTimer += dt
        if self.spawnTimer >= 5:
            self.spawnTimer = 0
            newGlob = Glob(random.randint(0, screen.get_width()), random.randint(0, screen.get_height()))
            self.entityManager.add(newGlob)
            
            
class EntityManager:
    def __init__(self):
        self.entities = []
        self.player = None
        self.mouse_world_pos = pygame.Vector2(0, 0)
    def add(self, entity):
        self.entities.append(entity)
    def remove(self, entity):
        if entity in self.entities:
            self.entities.remove(entity)
    def update(self, screen, dt):
        if self.player is None:
            for entity in self.entities:
                if isinstance(entity, Player):
                    self.player = entity
                    break
        for entity in self.entities:
            entity.update(self.player.position, screen, dt, self)
    def draw(self, screen, camera):
        for entity in self.entities:
            entity.draw(screen, camera)


