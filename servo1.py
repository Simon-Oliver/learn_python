import RPi.GPIO as gpio
import time
import pigpio
# Callculating angle from duty cycle (angle/180 × 10) + 2
# (0/180×10)+2 = 2
# (180/180×10)+2 = 12
# (90/180×10)+2 = 7

# Pulse range = maximum pulse width - minimum pulse width
# Pulse width per degree = pulse range / 181
# For a specified angle, the pulse width = minimum pulse width + (angle * pulse width per degree)

servo = 18

pwm = pigpio.pi()
pwm.set_mode(servo, pigpio.OUTPUT)

pwm.set_PWM_frequency(servo, 50)

# servo = 18
# gpio.setmode(gpio.BCM)
# gpio.setup(servo, gpio.OUT)

# p = gpio.PWM(servo, 50)
# p.start(0)
try:
    while True:
        angle = int(input("Enter Angle: "))
        pulseWidth = 500 + (angle * ((2400 - 500) / 181))
        dutyCycle = pulseWidth / 20000

        # duty_cylce = (angle / 180 * 10) + 2.5
        if(dutyCycle < 2.5):
            dutyCycle = 2.5
        print(dutyCycle)
        pwm.set_servo_pulsewidth(servo, pulseWidth)
        # p.ChangeDutyCycle(dutyCycle)
        time.sleep(0.3)

        # p.ChangeDutyCycle(7.5)
        # time.sleep(1)
        # p.ChangeDutyCycle(12.5)
        # time.sleep(1)
        # p.ChangeDutyCycle(2.5)
        # time.sleep(1)
except KeyboardInterrupt:
    # turning off servo
    pwm.set_PWM_dutycycle(servo, 0)
    pwm.set_PWM_frequency(servo, 0)

    # p.ChangeDutyCycle(2.5)
    # time.sleep(1)
    # p.stop()
    # gpio.cleanup()
