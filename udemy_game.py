import random

playerhp = 300
enemy_attak_l = 10
enemy_attak_h = 60

while playerhp > 0:
    damage = random.randrange(enemy_attak_l,enemy_attak_h)
    playerhp = playerhp - damage

    if playerhp < 30:
        print("Your health is low. You have been transfered to the next Hospital")
        break

    print("You've got hit and take", damage, "damage.", "Your HP is", playerhp)
