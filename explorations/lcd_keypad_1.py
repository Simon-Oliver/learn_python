import RPi_I2C_driver
import keypad
from time import *



mylcd = RPi_I2C_driver.lcd()
num =[]

try:
    while True:
        word = keypad.key_pad()
        num.append(word)
        if word == "D":
            num = []
            mylcd.lcd_clear()
            mylcd.lcd_display_string("".join(num), 1)

            # mylcd.lcd_clear()
            # sleep(1)
            # mylcd.backlight(0)
            # break
        else: 
            mylcd.lcd_display_string("".join(num), 1)
        sleep(0.5)

except:
    mylcd.lcd_clear()
    sleep(1)
    mylcd.backlight(0)
