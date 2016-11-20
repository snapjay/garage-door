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




#        if currentState != inputState:
#                currentState = inputState
        
#                if inputState == False:
                        
#                        print('Door Open = ' + str(time.time()))
#                else:
#                        print('Door Closed = ' + str(time.time()))
                
        time.sleep(0.5)
                
