# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

openPin = 11
closedPin = 12

GPIO.setmode(GPIO.BOARD)
GPIO.setup(openPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(closedPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

openState = GPIO.input(openPin)
closedState = GPIO.input(closedPin)

if openState and closedState:
        print('TRANSITION')

elif closedState:
        print('CLOSED')

elif openState:
        print('OPEN')

else:
        print('FAIL')
