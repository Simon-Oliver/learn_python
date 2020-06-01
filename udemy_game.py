import random

playerhp = 300

class Enemy:
    def __init__(self, enemy_attack_l, enemy_attack_h):
        self.enemy_attack_l = enemy_attack_l
        self.enemy_attack_h = enemy_attack_h

    def get_attack(self):
        print(self.enemy_attack_l)

enemy1 = Enemy(10, 60)

enemy1.get_attack()

# while playerhp > 0:
#     damage = random.randrange(enemy1.enemy_attak_l, enemy1.enemy_attak_h)
#     playerhp = playerhp - damage
#
#     if playerhp < 30:
#         print("Your health is low. You have been transfered to the next Hospital")
#         break
#
#     print("You've got hit and take", damage, "damage.", "Your HP is", playerhp)
