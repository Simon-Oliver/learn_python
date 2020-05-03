import time
import spidev
from datetime import datetime, timedelta
from timeit import default_timer as timer

spi_ch = 0

# Enable SPI
spi = spidev.SpiDev(0, spi_ch)
spi.max_speed_hz = 1200000


def read_adc(adc_ch, vref=3.3):

    # Make sure ADC channel is 0 or 1
    if adc_ch != 0:
        adc_ch = 1

    # Construct SPI message
    #  First bit (Start): Logic high (1)
    #  Second bit (SGL/DIFF): 1 to select single mode
    #  Third bit (ODD/SIGN): Select channel (0 or 1)
    #  Fourth bit (MSFB): 0 for LSB first
    #  Next 12 bits: 0 (don't care)
    msg = 0b11
    msg = ((msg << 1) + adc_ch) << 5
    msg = [msg, 0b00000000]
    reply = spi.xfer2(msg)

    # Construct single integer out of the reply (2 bytes)
    adc = 0
    for n in reply:
        adc = (adc << 8) + n

    # Last bit (0) is not part of ADC value, shift to remove it
    adc = adc >> 1

    # Calculate voltage form ADC value
    # percentage = (adc/1023) *100
    voltage = (vref * adc) / 1024

    return adc

state = ""
prev_state = ""
curr_time = 0
prev_time = timer()

# Report the channel 0 and channel 1 voltages to the terminal
try:
   
    while True:
        adc_0 = read_adc(0)
        adc_1 = read_adc(1)
        if(read_adc(0) <= 300):
            state = "On"
            curr_time = timer()
        else:
            state = "Off"
            curr_time = timer()

        if(prev_state != state):
            prev_state = state
            print(state, curr_time - prev_time)
            prev_time = curr_time
        time.sleep(0.2)

finally:
    print("Closing Program")
