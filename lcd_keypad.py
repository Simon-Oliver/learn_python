import RPi_I2C_driver
import keypad
from time import *

mylcd = RPi_I2C_driver.lcd()

try:
    while True:
        word = keypad.key_pad()
        if word == "D":
            mylcd.lcd_clear()
            sleep(1)
            mylcd.backlight(0)
            break
        else:
            mylcd.lcd_clear()
            print(word)
            mylcd.lcd_display_string(word, 1)
        sleep(0.5)

except KeyboardInterrupt:
    mylcd.lcd_clear()
    sleep(1)
    mylcd.backlight(0)
