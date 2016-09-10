# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

reedPin = 12
GPIO.setmode(GPIO.BOARD)
GPIO.setup(reedPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

inputState = GPIO.input(reedPin)

if inputState == False:
        
        print('open')
else:
        print('closed')
        

                
