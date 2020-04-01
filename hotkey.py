import keyboard
import pyperclip

dic = [
    """Sample Multilin
       Text to test if this is working""",
    """More text now on postion 2""",
    """More dummy text!"""
]


def print_clipboard(key):
    try:
        print(dic[int(pos)])
    except:
        print('No Number content on this key')


while True:
    keyboard.on_release(print_clipboard)


# keyboard.add_hotkey("shift + cmd + 1", lambda: print_clipboard())


# def print_pressed_keys(e):
#     print(keyboard._pressed_events)

# keyboard.hook(print_pressed_keys)
keyboard.wait('esc')
# """
# Prints the scan code of all currently pressed keys.
# Updates on every keyboard event.
# """
# import sys
# sys.path.append('..')
# import keyboard


# def print_pressed_keys(e):
#     line = ', '.join(str(code) for code in keyboard._pressed_events)
#     # '\r' and end='' overwrites the previous line.
#     # ' '*40 prints 40 spaces at the end to ensure the previous line is cleared.
#     print(keyboard._pressed_events)


# keyboard.hook(print_pressed_keys)
# keyboard.wait('esc')
