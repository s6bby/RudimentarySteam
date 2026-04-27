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
        self.score = 0
        self.shootTimer = 0
        self.healthTimer = 0
        self.settings = settings
        self.dashBar = 100
        self.color = settings.theme["player"]

    def update(self, targetposition, screen, dt, entityManager):
        self.move(dt)
        self.dashBar = min(100, self.dashBar + 20 * dt)
        self.checkCollisions(entityManager, screen, dt)
        self.shoot(screen, dt, entityManager)

    def checkCollisions(self, entityManager, screen, dt):
        self.healthTimer += dt
        if self.position.x - self.radius < 0:
            self.position.x = self.radius
        if self.position.x + self.radius > screen.get_width() + 5000:
            self.position.x = screen.get_width() - self.radius
        if self.position.y - self.radius < 0:
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
            if keysPressed[pygame.K_LSHIFT]:
                if self.dashBar >= 10:
                    self.dashBar -= 10
                    velocity *= 10
            self.position += velocity * self.speed * dt
    def draw(self, screen, camera):
        pygame.draw.circle(screen, self.color, camera.apply(self), self.radius)
        font = pygame.font.SysFont(None, 36)
        healthText = font.render(f"Health: {self.health}", True, self.color)
        screen.blit(healthText, (10, 50))
        #dashbar is white bar that shows how close to 100 it is, with white border around
        pygame.draw.rect(screen, "white", (10, 90, 202, 24), 2)
        pygame.draw.rect(screen, "white", (10, 90, self.dashBar * 2, 20))
    def updateScore(self, points):
        self.score += points
        self.score = max(0, self.score)
        

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
        self.range = 1000
    def update(self, targetposition, screen, dt, entityManager):
        self.path(targetposition, dt)
        self.checkCollisions(entityManager, screen, dt)
        self.shootTimer += dt
        if self.health <= 0:
            entityManager.remove(self)
        if self.shootTimer >= 2 and self.position.distance_to(targetposition) <= self.range:
            self.shootTimer = 0
            entityManager.add(self.shoot(targetposition))
    def draw(self, screen, camera):
        pos = camera.apply(self)
        pygame.draw.circle(screen, "red", pos, self.radius)
        pygame.draw.rect(screen, "green", (pos.x - self.health / 2, pos.y + self.radius + 10, self.health, 6))
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
                    entityManager.player.updateScore(10)
                    self.health -= 10
                    entityManager.remove(bullet)
    def shoot(self, targetposition):
        return Bullet(self.position, targetposition)

class Glorp(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 45
        self.radius = 40
        self.health = 50
    def update(self, targetposition, screen, dt, entityManager):
        self.path(targetposition, dt)
        self.checkCollisions(entityManager, screen, dt)
        if self.health <= 0:
            entityManager.remove(self)
    def draw(self, screen, camera):
        pygame.draw.circle(screen, "blue", camera.apply(self), self.radius)
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
                    entityManager.player.updateScore(10)
                    self.health -= 10
                    entityManager.remove(bullet)

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
        if self.position.x > (screen.get_width() + 5000) or self.position.x < (-5000) or self.position.y > (screen.get_height() + 5000) or self.position.y < (-5000):
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
        self.spawnTime = 5
        self.spawnLimit = 6
        self.entityManager = entityManager
    def update(self, targetposition, screen, dt, entityManager):
        self.spawnTimer += dt
        if self.spawnTimer >= self.spawnTime and entityManager.getNumberOfEntities(Glob) < self.spawnLimit:
            self.spawnTimer = 0
            newGlob = Glob(random.randint(math.floor(entityManager.player.position.x - 850), math.ceil(entityManager.player.position.x + 850)), random.randint(math.floor(entityManager.player.position.y - 850), math.ceil(entityManager.player.position.y + 850)))
            self.entityManager.add(newGlob)
        if entityManager.player.score % 200 == 0:
            pass
            
            
            
class GlorpSpawner(Entity):
    def __init__(self, entityManager):
        self.spawnTimer = 0
        self.entityManager = entityManager
    def update(self, targetposition, screen, dt, entityManager):
        self.spawnTimer += dt
        if self.spawnTimer >= 10 and entityManager.getNumberOfEntities(Glorp) < 3:
            self.spawnTimer = 0
            newGlorp = Glorp(random.randint(math.floor(entityManager.player.position.x - 850), math.ceil(entityManager.player.position.x + 850)), random.randint(math.floor(entityManager.player.position.y - 850), math.ceil(entityManager.player.position.y + 850)))
            self.entityManager.add(newGlorp)
            
            
class EntityManager:
    def __init__(self):
        self.entities = []
        self.player = None
        self.mouse_world_pos = pygame.Vector2(0, 0)
        self.tileMap = TileMap()
    def add(self, entity):
        self.entities.append(entity)
    def remove(self, entity):
        if entity in self.entities:
            self.entities.remove(entity)
    def update(self, screen, dt):
        self.tileMap.update(dt)
        if self.player is None:
            for entity in self.entities:
                if isinstance(entity, Player):
                    self.player = entity
                    break
        for entity in self.entities:
            entity.update(self.player.position, screen, dt, self)
    def draw(self, screen, camera):
        self.tileMap.draw(screen, camera)
        for entity in self.entities:
            entity.draw(screen, camera)
    def getNumberOfEntities(self, entityType):
        count = 0
        for entity in self.entities:
            if isinstance(entity, entityType):
                count += 1
        return count

class TileMap:
    def __init__(self, tileSize=512):
        self.tileSize = tileSize
        self.map_data = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]

    def update(self, dt):
        pass 

    def draw(self, screen, camera):
        for row_index, row in enumerate(self.map_data):
            for col_index, tile in enumerate(row):
                if tile == 1:
                    # Apply camera offset
                    pos = camera.apply_rect(pygame.Rect(
                        col_index * self.tileSize, 
                        row_index * self.tileSize, 
                        self.tileSize, self.tileSize
                    ))
                    pygame.draw.rect(screen, (50, 50, 50), pos)
                    pygame.draw.rect(screen, (0, 0, 0), pos, 2)