from classes.game import Person, bcolors

magic = [{"name": "Fire", "cost": 10, "dmg": 60},
         {"name": "Thunder", "cost": 30, "dmg": 100},
         {"name": "Blizzard", "cost": 50, "dmg": 130}
         ]

player = Person(460, 65, 60, 34, magic)

print(player.generate_damage())
print(player.generate_damage())
print(player.generate_damage())
print(player.generate_magic_damage(0))
print(player.generate_magic_damage(2))
print(player.get_hp())
print(player.take_damage(100))
print(player.reduce_mp(50))
print(player.get_hp(), "HP")
print(player.get_mp(), "MP")
player.choose_magic()
# while playerhp > 0:
#     damage = random.randrange(enemy1.enemy_attak_l, enemy1.enemy_attak_h)
#     playerhp = playerhp - damage
#
#     if playerhp < 30:
#         print("Your health is low. You have been transfered to the next Hospital")
#         break
#
#     print("You've got hit and take", damage, "damage.", "Your HP is", playerhp)
