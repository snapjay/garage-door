# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

openPin = 11
closedPin = 12

GPIO.setmode(GPIO.BOARD)
GPIO.setup(openPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(closedPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)



openState = ''

while True:
        _openState = GPIO.input(openPin)
        _closedState = GPIO.input(closedPin)
		
	print ('OPEN:' + str(_openState) + ' CLOSED: ' + str(_closedState))


    if openState == True  and closedState == True:
            newState = 'open'

    elif closedState == True:
            newState = 'closed'

    else:
            newState = 'transition'

    if currentState != newState:
            currentState = inputState
            print(newState + ' @' + str(time.time()))

                
    time.sleep(0.5)
                
