# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO


RELAYPIN = 7

GPIO.setmode(GPIO.BOARD)
GPIO.setup(RELAYPIN, GPIO.OUT)
GPIO.output(RELAYPIN, GPIO.LOW)

time.sleep(0.5)

GPIO.output(RELAYPIN, GPIO.HIGH)


GPIO.cleanup()

print("done")


