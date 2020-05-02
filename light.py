    GNU nano 3.2                                 light.py

import time
import spidev
from datetime import datetime, timedelta

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
        [Read 63 lines]


^G Get Help ^ O Write Out ^ W Where Is ^ K Cut Text ^ J Justify ^ C Cur Pos
^X Exit ^ R Read File ^\ Replace ^ U Uncut Text ^ T To Spell ^ _ Go To Line
