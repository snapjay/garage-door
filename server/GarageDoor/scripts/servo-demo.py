# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO


servoPin = 7
GPIO.setmode(GPIO.BOARD)
GPIO.setup(servoPin, GPIO.OUT)

pwm = GPIO.PWM(servoPin, 50)
pwm.start(2.5)
time.sleep(2)

try:
    while True:
            pwm.ChangeDutyCycle(7.5)
            time.sleep(1)
            
            pwm.ChangeDutyCycle(11.0)
            time.sleep(1)
            
            pwm.ChangeDutyCycle(2.5)
            time.sleep(1)
            
except KeyboardInterrupt:

    pwm.stop()
    GPIO.cleanup()
