# -*- coding: utf-8 -*-
import time
import RPi.GPIO as GPIO

servoPin = 7
start = 8
end = 6
GPIO.setmode(GPIO.BOARD)

GPIO.setup(servoPin, GPIO.OUT)

pwm = GPIO.PWM(servoPin, 50)
pwm.start(start)
time.sleep(0.5)
pwm.ChangeDutyCycle(end)
time.sleep(1)
pwm.ChangeDutyCycle(start)
pwm.stop()
GPIO.cleanup()

print("done")