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
    choice = input("Choose action:")

    print(player.get_actions(int(choice)-1))

    running = False

