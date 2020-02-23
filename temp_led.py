import os
import time
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)


os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_id = '28-00000a9960e9'
device_file = base_dir + device_id + '/w1_slave'

def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines

def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        return temp_c


try:
   while True:
        temp = read_temp()
        print(temp)
        if temp > 27:
            print(temp)
            print("LED on")
            GPIO.output(18,GPIO.HIGH)

        if temp < 25:
            print(temp)
            print("LED off")
            GPIO.output(18,GPIO.LOW)

        else:
            print(temp)
        time.sleep(1)

except:
    print("exiting")
    GPIO.output(18, GPIO.LOW) # Switch off the LED
    GPIO.cleanup()




