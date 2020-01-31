#include "DHT.h"
#include <ArduinoJson.h>

#define SW_PIN    2
#define LED_PIN   13
#define RED_LED   3
#define GREEN_LED 6
#define BLUE_LED  5
#define RELAY_PIN 4
#define DHT_PIN   8
#define ECHO_PIN  10
#define TRIG_PIN  11

#define CDS_PIN   A0

StaticJsonDocument<256> doc;
StaticJsonDocument<80> pDoc;
DHT dht(DHT_PIN, DHT11);  // Adafruit sensor library
int doParseJson(char *);
void readSensors();
float ultraSonic();
void blinkLED(int);
int red=200;
int green=128;
int blue=80;
int relay=0;

void setup() {
  Serial.begin(115200);

  pinMode(SW_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(CDS_PIN, INPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  dht.begin();
  delay(1000);
}

void loop() {
  digitalWrite(13, HIGH);
  Serial.print("Ready\n");
  if (Serial.available() > 0) {
    char buf[80];
    String str;
    byte len = 0;

    len = Serial.readBytes(buf, 80);
    buf[len-1] = 0;
    str = (String)buf;

    if (str.indexOf("GET") == 0) {  // Read Sensor Data and Transmit
      readSensors();
      serializeJson(doc, Serial);
      Serial.print("\n");
    } else if (str.indexOf("PUT") == 0) { // Update Actuator Data
      if (doParseJson(&(buf[4])) == 0)
        Serial.print("OK\n");
      else
        Serial.print("BAD\n");
    } else if (str.indexOf("ACK") == 0) {
      Serial.print("OK\n");
      analogWrite(RED_LED, red);
      analogWrite(GREEN_LED, green);
      analogWrite(BLUE_LED, blue);
      digitalWrite(RELAY_PIN, relay);
      blinkLED(500);
    } else if (str.indexOf("OFF") == 0) {
      analogWrite(RED_LED, 0);
      analogWrite(GREEN_LED, 0);
      analogWrite(BLUE_LED, 0);
      digitalWrite(RELAY_PIN, 0);
      Serial.print("OK\n");
    } else {
      blinkLED(200);
    }
  }
  delay(1000);
}

void readSensors() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  doc["humidity"] = humidity;
  doc["temperature"] = temperature;
  doc["cds"] = analogRead(CDS_PIN);
  doc["distance"] = ultraSonic();
}

float ultraSonic() {
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  unsigned long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = ((float)(340 * duration) / 10000) / 2;
  //return (float)pulseIn(ECHO_PIN, HIGH) / 58;
  return distance;
}

int doParseJson(char *jsonStr) { 
  DeserializationError error = deserializeJson(pDoc, jsonStr);

  // Test if parsing succeeds.
  if (error) {
    //Serial.print(F("deserializeJson() failed: "));
    //Serial.println(error.c_str());
    blinkLED(100);
    return -1;
  }

  // Fetch values and update actuator
  red = pDoc["red"];
  green = pDoc["green"];
  blue = pDoc["blue"];
  relay = pDoc["relay"];
  analogWrite(RED_LED, red);
  analogWrite(GREEN_LED, green);
  analogWrite(BLUE_LED, blue);
  digitalWrite(RELAY_PIN, relay);
  return 0;
}

void blinkLED(int interval) {
  for (int i=0; i<10; i++) {
    digitalWrite(LED_PIN, digitalRead(LED_PIN)^1);
    delay(interval);
  }
}
