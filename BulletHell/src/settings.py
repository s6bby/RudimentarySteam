themes = {
    "Default": {
        "background": "black",
        "player": "white",
        "enemy": "red",
        "bullet": "yellow"
    },
    "Dark": {
        "background": (30, 30, 30),
        "player": (200, 200, 200),
        "enemy": (255, 100, 100),
        "bullet": (255, 255, 100)
    },
    "Light": {
        "background": (220, 220, 220),
        "player": (50, 50, 50),
        "enemy": (255, 150, 150),
        "bullet": (255, 255, 150)
    }
}

class Settings:
    def __init__(self):
        self.volume = 1.0
        self.difficulty = "Normal"
        self.theme = themes["Default"]
        self.unlockedThemes = {"Default": True, "Dark": False, "Light": False}
        
settings = Settings()