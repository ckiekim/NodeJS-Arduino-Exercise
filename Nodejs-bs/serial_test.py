import serial
import time

ser = serial.Serial(port='COM4', baudrate=115200, timeout=10)

#print(ser)
ser.write(b'PUT\n')
time.sleep(1);
ser.write(b'GET\n')

if ser.readable():
    result = ser.readline()
    print(result)
