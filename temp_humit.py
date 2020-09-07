import Adafruit_DHT
import time
import datetime

sensor = Adafruit_DHT.DHT11
DHT11_pin = 23

humidity, temperature = Adafruit_DHT.read_retry(sensor, DHT11_pin)
while True:
    if humidity is not None and temperature is not None:
        print(
            f'Temperature={temperature}°C  Humidity={humidity}%  Time={datetime.datetime.now()}')
    else:
        print('Failed to get reading from the sensor. Try again!')
    time.sleep(1*60)
