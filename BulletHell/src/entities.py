import math
import random
import pygame
from settings import settings

def get_clamped_spawn_pos(player_pos, min_dist, max_dist, map_w, map_h):
    angle = random.uniform(0, 2 * math.pi)
    dist = random.randint(min_dist, max_dist)
    spawn_x = max(0, min(map_w, player_pos.x + math.cos(angle) * dist))
    spawn_y = max(0, min(map_h, player_pos.y + math.sin(angle) * dist))
    return spawn_x, spawn_y

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
        self.radius = 30 
        self.speed = 400
        self.health = 100
        self.score = 0
        self.shootTimer = 0
        self.healthTimer = 0
        self.dashBar = 100
        self.isDashing = False

    def update(self, targetposition, screen, dt, entityManager):
        self.move(dt)
        if not self.isDashing:
            self.dashBar = min(100, self.dashBar + 40 * dt)
        self.checkCollisions(entityManager, screen, dt)
        self.shoot(dt, entityManager)

    def checkCollisions(self, entityManager, screen, dt):
        self.healthTimer += dt
        self.position.x = max(self.radius, min(self.position.x, entityManager.map_width - self.radius))
        self.position.y = max(self.radius, min(self.position.y, entityManager.map_height - self.radius))

        for entity in entityManager.entities:
            if isinstance(entity, Health):
                if self.position.distance_to(entity.position) < (self.radius + entity.radius):
                    self.health = min(100, self.health + 20)
                    entityManager.remove(entity)
            elif isinstance(entity, Enemy) and not isinstance(entity, PlayerBullet):
                if self.position.distance_to(entity.position) < (self.radius + entity.radius):
                    if self.healthTimer >= 0.5:
                        self.health -= 15
                        self.healthTimer = 0
                        if isinstance(entity, Bullet):
                            entityManager.remove(entity)

    def shoot(self, dt, entityManager):
        keys = pygame.key.get_pressed()
        self.shootTimer += dt
        if (keys[pygame.K_SPACE] or pygame.mouse.get_pressed()[0]) and self.shootTimer >= 0.15:
            self.shootTimer = 0
            entityManager.add(PlayerBullet(self.position, entityManager.mouse_world_pos))

    def move(self, dt):
        vel = pygame.Vector2(0, 0)
        keys = pygame.key.get_pressed()
        if keys[pygame.K_w]: vel.y -= 1
        if keys[pygame.K_s]: vel.y += 1
        if keys[pygame.K_a]: vel.x -= 1
        if keys[pygame.K_d]: vel.x += 1
        
        if vel.magnitude() != 0:    
            vel.normalize_ip() 
            if keys[pygame.K_LSHIFT] and self.dashBar >= 30:
                self.isDashing = True
                self.dashBar -= 150 * dt
                vel *= 2.5
                if self.dashBar <= 0: self.isDashing = False
            else:
                self.isDashing = False
            self.position += vel * self.speed * dt

    def draw(self, screen, camera):
        pos = camera.apply(self)
        color = settings.theme["player"]
        pygame.draw.circle(screen, color, pos, self.radius)
        pygame.draw.circle(screen, (50, 50, 50), pos, self.radius, 3)
        
        if self.isDashing:
            pygame.draw.circle(screen, "white", pos, self.radius + 5, 2)

        pygame.draw.rect(screen, (40, 40, 40), (pos.x - 40, pos.y - 50, 80, 8))
        pygame.draw.rect(screen, (0, 255, 100), (pos.x - 40, pos.y - 50, 80 * (self.health/100), 8))
        
        pygame.draw.rect(screen, (40, 40, 40), (pos.x - 40, pos.y - 60, 80, 4))
        pygame.draw.rect(screen, (0, 200, 255), (pos.x - 40, pos.y - 60, 80 * (self.dashBar/100), 4))

    def updateScore(self, points):
        self.score += points

class Enemy(Entity):
    pass

class Glob(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 120
        self.shootTimer = 0
        self.radius = 25
        self.health = 30
    def update(self, target, screen, dt, entityManager):
        dir = (target - self.position)
        if dir.magnitude() > 0:
            self.position += dir.normalize() * self.speed * dt
        
        self.shootTimer += dt
        if self.shootTimer >= 1.5:
            self.shootTimer = 0
            entityManager.add(Bullet(self.position, target))
            
        if self.health <= 0:
            entityManager.player.updateScore(50)
            entityManager.remove(self)

    def draw(self, screen, camera):
        pos = camera.apply(self)
        color = settings.theme["enemy"]
        pygame.draw.circle(screen, color, pos, self.radius)
        pygame.draw.circle(screen, "white", pos, self.radius, 2)
        pygame.draw.rect(screen, (255, 0, 0), (pos.x - 20, pos.y + 35, 40 * (self.health/30), 5))

class Glorp(Enemy):
    def __init__(self, xpos, ypos):
        super().__init__(xpos, ypos)
        self.speed = 180
        self.radius = 20
        self.health = 60
        self.lungeTimer = 0
        self.isLunging = 0
    def update(self, target, screen, dt, entityManager):
        dist = self.position.distance_to(target)
        self.lungeTimer += dt
        
        move_speed = self.speed
        if dist < 400 and self.lungeTimer >= 2.5:
            self.isLunging = 0.5
            self.lungeTimer = 0
            
        if self.isLunging > 0:
            move_speed *= 4
            self.isLunging -= dt
            
        dir = (target - self.position)
        if dir.magnitude() > 0:
            self.position += dir.normalize() * move_speed * dt
            
        if self.health <= 0:
            entityManager.player.updateScore(100)
            entityManager.remove(self)

    def draw(self, screen, camera):
        pos = camera.apply(self)
        color = (255, 165, 0) if self.isLunging > 0 else settings.theme["enemy"]
        points = [
            (pos.x, pos.y - self.radius),
            (pos.x + self.radius, pos.y + self.radius),
            (pos.x - self.radius, pos.y + self.radius)
        ]
        pygame.draw.polygon(screen, color, points)
        pygame.draw.polygon(screen, "white", points, 2)

class Bullet(Enemy):
    def __init__(self, pos, target):
        super().__init__(pos.x, pos.y)
        self.speed = 350
        self.radius = 8
        self.color = settings.theme["bullet"]
        dir = (target - self.position)
        self.velocity = dir.normalize() * self.speed if dir.magnitude() > 0 else pygame.Vector2(0,0)

    def update(self, target, screen, dt, entityManager):
        self.position += self.velocity * dt
        if not (0 <= self.position.x <= entityManager.map_width and 0 <= self.position.y <= entityManager.map_height):
            entityManager.remove(self)

    def draw(self, screen, camera):
        pygame.draw.circle(screen, self.color, camera.apply(self), self.radius)

class PlayerBullet(Bullet):
    def __init__(self, pos, target):
        super().__init__(pos, target)
        self.speed = 800
        self.color = settings.theme["player_bullet"]
        dir = (target - self.position)
        self.velocity = dir.normalize() * self.speed if dir.magnitude() > 0 else pygame.Vector2(0,0)
    
    def update(self, target, screen, dt, entityManager):
        self.position += self.velocity * dt
        for e in entityManager.entities:
            if isinstance(e, Enemy) and not isinstance(e, Bullet):
                if self.position.distance_to(e.position) < (self.radius + e.radius):
                    e.health -= 20
                    entityManager.remove(self)
                    return
        if not (0 <= self.position.x <= entityManager.map_width and 0 <= self.position.y <= entityManager.map_height):
            entityManager.remove(self)

class GlobSpawner(Entity):
    def __init__(self, mgr):
        self.timer = 0
    def update(self, target, screen, dt, mgr):
        self.timer += dt
        limit = 10 + (mgr.player.score // 500)
        interval = max(0.4, 2.0 * (0.9 ** (mgr.player.score / 200)))
        if self.timer >= interval and mgr.getNumberOfEntities(Glob) < limit:
            self.timer = 0
            x, y = get_clamped_spawn_pos(target, 700, 1000, mgr.map_width, mgr.map_height)
            mgr.add(Glob(x, y))

class GlorpSpawner(Entity):
    def __init__(self, mgr):
        self.timer = 0
    def update(self, target, screen, dt, mgr):
        self.timer += dt
        limit = 3 + (mgr.player.score // 1000)
        interval = max(1.0, 5.0 * (0.85 ** (mgr.player.score / 300)))
        if self.timer >= interval and mgr.getNumberOfEntities(Glorp) < limit:
            self.timer = 0
            x, y = get_clamped_spawn_pos(target, 800, 1100, mgr.map_width, mgr.map_height)
            mgr.add(Glorp(x, y))

class Health(Entity):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.radius = 15
    def draw(self, screen, camera):
        pos = camera.apply(self)
        pygame.draw.rect(screen, "white", (pos.x - 15, pos.y - 15, 30, 30), border_radius=4)
        pygame.draw.line(screen, "red", (pos.x - 10, pos.y), (pos.x + 10, pos.y), 4)
        pygame.draw.line(screen, "red", (pos.x, pos.y - 10), (pos.x, pos.y + 10), 4)

class HealthSpawner(Entity):
    def __init__(self, mgr):
        self.timer = 0
    def update(self, target, screen, dt, mgr):
        self.timer += dt
        if self.timer >= 12:
            self.timer = 0
            x, y = get_clamped_spawn_pos(target, 400, 800, mgr.map_width, mgr.map_height)
            mgr.add(Health(x, y))

class EntityManager:
    def __init__(self):
        self.entities = []
        self.player = None
        self.mouse_world_pos = pygame.Vector2(0, 0)
        self.tileMap = TileMap()
        self.map_width = len(self.tileMap.map_data[0]) * self.tileMap.tileSize
        self.map_height = len(self.tileMap.map_data) * self.tileMap.tileSize
    def add(self, e): self.entities.append(e)
    def remove(self, e): 
        if e in self.entities: self.entities.remove(e)
    def update(self, screen, dt):
        if not self.player:
            for e in self.entities:
                if isinstance(e, Player): self.player = e
        for e in self.entities[:]:
            e.update(self.player.position, screen, dt, self)
    def draw(self, screen, camera):
        self.tileMap.draw(screen, camera)
        for e in self.entities: e.draw(screen, camera)
    def getNumberOfEntities(self, t):
        return sum(1 for e in self.entities if isinstance(e, t))

class TileMap:
    def __init__(self, tileSize=512):
        self.tileSize = tileSize
        self.map_data = [[1]*20 for _ in range(15)]
    def draw(self, screen, camera):
        for r_idx, row in enumerate(self.map_data):
            for c_idx, tile in enumerate(row):
                rect = pygame.Rect(c_idx * self.tileSize, r_idx * self.tileSize, self.tileSize, self.tileSize)
                draw_rect = camera.apply_rect(rect)
                pygame.draw.rect(screen, (30, 30, 40), draw_rect)
                pygame.draw.rect(screen, (20, 20, 30), draw_rect, 1)