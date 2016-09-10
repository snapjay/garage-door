# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

reedPin = 12
GPIO.setmode(GPIO.BOARD)
GPIO.setup(reedPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

currentState = ''

while True:
        inputState = GPIO.input(reedPin)

        if currentState != inputState:
                currentState = inputState
        
                if inputState == False:
                        
                        print('Door Open = ' + str(time.time()))
                else:
                        print('Door Closed = ' + str(time.time()))
                
        time.sleep(0.5)
                
