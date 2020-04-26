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


def set_servo(angle):
    angle = int(angle)
    pulseWidth = 500 + (angle * ((2400 - 500) / 181))

    pwm.set_servo_pulsewidth(servo, pulseWidth)
    # p.ChangeDutyCycle(dutyCycle)
    time.sleep(0.3)
