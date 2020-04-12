import RPi_I2C_driver
from time import *

mylcd = RPi_I2C_driver.lcd()
# test 2
fontdata2 = [
    # Char 0 - left arrow
    [0x1, 0x3, 0x7, 0xf, 0xf, 0x7, 0x3, 0x1],
    # Char 1 - left one bar
    [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x10],
    # Char 2 - left two bars
    [0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18],
    # Char 3 - left 3 bars
    [0x1c, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c, 0x1c],
    # Char 4 - left 4 bars
    [0x1e, 0x1e, 0x1e, 0x1e, 0x1e, 0x1e, 0x1e, 0x1e],
    # Char 5 - left start
    [0x0, 0x1, 0x3, 0x7, 0xf, 0x1f, 0x1f, 0x1f],
    # Char 6 - Lock icon
    [0x0E, 0x11, 0x11, 0x1F, 0x1B, 0x1B, 0x1F, 0x00],
]

# Load logo chars from the second set
mylcd.lcd_load_custom_chars(fontdata2)


# display two blocks in columns 5 and 6 (i.e. AFTER pos. 4) in row 1
# first draw two blocks on 5th column (cols 5 and 6), starts from 0

def draw_block(start, end, row, pause):
    block = chr(255)  # block character, built-in
    r = end - start
    pos = start
    for i in range(r):
        for char in range(1, 5):
            mylcd.lcd_display_string_pos(chr(char), row, i)
            sleep(pause)

        mylcd.lcd_display_string_pos(block, row, i)
        sleep(pause)


draw_block(0, 4, 1, 0.2)

mylcd.lcd_display_string_pos(chr(6), 2, 1)

sleep(5)
mylcd.lcd_clear()
