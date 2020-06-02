import random


class Enemy:
    enemy_hp = 200

    def __init__(self, enemy_attack_l, enemy_attack_h):
        self.enemy_attack_l = enemy_attack_l
        self.enemy_attack_h = enemy_attack_h

    def get_stats(self):
        print(self.enemy_attack_l)
        print(self.enemy_attack_h)
        print(self.enemy_hp)


enemy1 = Enemy(10, 60)
enemy1.get_stats()

# while playerhp > 0:
#     damage = random.randrange(enemy1.enemy_attak_l, enemy1.enemy_attak_h)
#     playerhp = playerhp - damage
#
#     if playerhp < 30:
#         print("Your health is low. You have been transfered to the next Hospital")
#         break
#
#     print("You've got hit and take", damage, "damage.", "Your HP is", playerhp)
