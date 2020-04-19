import RPi.GPIO as gpio
import time

# Callculating angle from duty cycle (angle/180 × 10) + 2
# (0/180×10)+2 = 2
# (180/180×10)+2 = 12
# (90/180×10)+2 = 7

servo = 18
gpio.setmode(gpio.BCM)
gpio.setup(servo, gpio.OUT)

p = gpio.PWM(servo, 50)
p.start(0)
try:
    while True:
        angle = int(input("Enter Angle: "))
        duty_cylce = (angle / 180 * 10) + 2.5
        if(duty_cylce < 2.5):
            duty_cylce = 2.5
        print(duty_cylce)
        p.ChangeDutyCycle(duty_cylce)
        time.sleep(0.3)

        # p.ChangeDutyCycle(7.5)
        # time.sleep(1)
        # p.ChangeDutyCycle(12.5)
        # time.sleep(1)
        # p.ChangeDutyCycle(2.5)
        # time.sleep(1)
except KeyboardInterrupt:
    p.ChangeDutyCycle(2.5)
    time.sleep(1)
    p.stop()
    gpio.cleanup()
