from pynput.keyboard import Key, Listener
from pynput import keyboard


def on_press(key):
    if isinstance(key, keyboard.KeyCode):
        if key.char.isnumeric():
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
