from classes.game import Person, bcolors

magic = [{"name": "Fire", "cost": 10, "dmg": 60},
         {"name": "Thunder", "cost": 30, "dmg": 100},
         {"name": "Blizzard", "cost": 50, "dmg": 130}
         ]

player = Person(460, 65, 60, 34, magic)
enemy1 = Person(1260, 65, 45, 24, magic)

running = True

print(bcolors.FAIL + bcolors.BOLD + "AN ENEMY ATTACKS!" + bcolors.ENDC)

while running:
    print("===================================")
    player.choose_action()
    choice = int(input("Choose action:"))-1
    action = player.get_actions(choice)

    if action == "Attack":
        dmg = player.generate_damage()
        enemy1.take_damage(dmg)
        print("You attacked for", dmg, "Enemy HP:", enemy1.get_hp())
    elif action == "Magic":
        print("===================================")
        player.choose_magic()
        choice = int(input("Choose action:")) - 1
        action = player.get_spell_name(choice)
        print(action)

    enemy_dmg = enemy1.generate_damage()
    player.take_damage(enemy_dmg)
    print("You've been attacked for", enemy_dmg, "Player HP:", player.get_hp())

    if enemy1.get_hp() == 0:
        print(bcolors.OKGREEN + bcolors.BOLD + "YOU WIN!" + bcolors.ENDC)
        running = False

    elif player.get_hp() == 0:
        print(bcolors.FAIL + "Your enemy has defeated you" + bcolors.ENDC)
        running = False

