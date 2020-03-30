import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import time
GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(12, GPIO.IN) # Set pin 10 to be an input pin

count = 0
text = ""
setting = ["ON", "OFF", "OPTIONS"]
selected = ""

def button_callback(channel):
    global count
    count = count + 1

    if count == 3:
        count = 0

    print(f"{setting[count]}")
    time.sleep(0.2)

#GPIO.add_event_detect(12,GPIO.RISING,callback=button_callback,bouncetime=500)

try:
    while True:
        GPIO.wait_for_edge(12, GPIO.RISING)
        print("--> Pressed <--")
        start = time.time()
        time.sleep(0.2)
        
        while GPIO.input(12) == GPIO.HIGH:
            time.sleep(0.02)
            
        length = time.time() - start
        print(length)
        
        if length > 5:
            print("Long Press")
            
        elif length > 1:
            print("Medium Press")
            selected = setting[count]
            print(f"Selected Option: {selected}")
        
        else:
            print("Short Press")
            print(f"{setting[count]}")

#execute this code if CTRL + C is used to kill python script
except KeyboardInterrupt:
  print("You've exited the program")
#execute code inside this block as the program exits
finally:
  GPIO.cleanup()