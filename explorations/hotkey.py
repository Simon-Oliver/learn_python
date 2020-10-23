from pynput.keyboard import Key, Listener
from pynput import keyboard

r = range(1, 6)
options = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"]


def on_press(key):
    if isinstance(key, keyboard.KeyCode):
        if key.char.isnumeric():
            if int(key.char) in r:
                print(f"{options[int(key.char) -1]}")
            else:
                print("false")
            print(int(key.char))
        else:
            print(key.char)

    else:
        print(str(key))


def on_release(key):
    if key == Key.esc:
        # Stop listener
        return False


# Collect events until released
with Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()
