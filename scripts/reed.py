# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

openPin = 12
closedPin = 11

GPIO.setmode(GPIO.BOARD)
GPIO.setup(openPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(closedPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

openState = GPIO.input(openPin)
closedState = GPIO.input(closedPin)

if openState == True:
        print('open')

elif closedState == True:
        print('closed')

else:
        print('transition')
