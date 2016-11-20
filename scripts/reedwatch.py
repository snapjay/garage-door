# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

openPin = 11
closedPin = 12

GPIO.setmode(GPIO.BOARD)
GPIO.setup(openPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(closedPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

currentState = ''

while True:
    openState = GPIO.input(openPin)
    closedState = GPIO.input(closedPin)

    print ('OPEN:' + str(openState) + ' CLOSED: ' + str(closedState))

    if openState and closedState:
        newState = 'transition'

    elif closedState:
        newState = 'closed'

    elif openState:
        newState = 'open'

    else:
        newState = 'error'

    if currentState != newState:
        currentState = newState
        print(newState + ' @ ' + str(time.time()))

    time.sleep(0.5)
