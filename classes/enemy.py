import random


class Enemy:
    def __init__(self, hp, mp):
        self.hp = hp
        self.enemy_max_mp = mp

    def get_health(self):
        print(self.hp)