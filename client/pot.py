import time
import botbook_mcp3002 as mcp


def readPotentiometer():
    global potentiometer
    potentiometer = mcp.readAnalog()


def main():

    while True:
        readPotentiometer()
        print(potentiometer)
        time.sleep(0.5)  # s


if(__name__ == "__main__"):
    main()
