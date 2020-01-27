#include "DHT.h"
#include <ArduinoJson.h>

#define SW_PIN    2
#define LED_PIN   13
#define RED_LED   3
#define GREEN_LED 6
#define BLUE_LED  5
#define DHT_PIN   8
#define ECHO_PIN  10
#define TRIG_PIN  11

#define CDS_PIN   A0

StaticJsonDocument<256> doc;
StaticJsonDocument<100> pDoc;
DHT dht(DHT_PIN, DHT11);  // Adafruit sensor library
void readDHT11(), doParseJson();
float ultraSonic();
int oldKey = 0, newKey = 0;
int switchOn = 0;

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
  dht.begin();
}

void loop()
{
  if (switchOn) {
    digitalWrite(LED_PIN, digitalRead(LED_PIN)^1);
    readDHT11();
    doc["cds"] = analogRead(CDS_PIN);
    doc["distance"] = ultraSonic();
  
    int red = random(256);
    int green = random(256);
    int blue = random(256);
    analogWrite(RED_LED, red);
    analogWrite(GREEN_LED, green);
    analogWrite(BLUE_LED, blue);
  
    doc["red"] = red;
    doc["green"] = green;
    doc["blue"] = blue;
  
    serializeJson(doc, Serial);  
    //serializeJsonPretty(doc, Serial);
    Serial.println();
  
    doParseJson();
  } else {
    digitalWrite(LED_PIN, LOW);
    analogWrite(RED_LED, 0);
    analogWrite(GREEN_LED, 0);
    analogWrite(BLUE_LED, 0);
  }

  for (int i = 0; i < 500; i++) {
    // Edge Switching
    newKey = digitalRead(SW_PIN);
    if(oldKey != newKey){
      oldKey = newKey;
      if(newKey == LOW){ // 하강엣지
        if (switchOn)
          Serial.println("Switch OFF");
        else
          Serial.println("Switch ON");
        switchOn ^= 1;
        break;
      } else { // 상승엣지
        // digitalWrite(ledRED, LOW);
        // Serial.println("Switch is unpressed.");
      }
    }
    delay(10);
  }
}

void readDHT11() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  doc["humidity"] = humidity;
  doc["temperature"] = temperature;
  /* char dhtBuf[30], humidBuf[10], tempBuf[10];
  dtostrf(humidity, 5, 1, humidBuf);
  dtostrf(temperature, 5, 1, tempBuf);
  sprintf(dhtBuf, "%s, %s\t", humidBuf,  tempBuf);
  Serial.print(dhtBuf); */  
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

void doParseJson() {
  char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
  // Deserialize the JSON document
  DeserializationError error = deserializeJson(pDoc, json);

  // Test if parsing succeeds.
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    return;
  }

  // Fetch values.
  const char* sensor = pDoc["sensor"];
  long time = pDoc["time"];
  double latitude = pDoc["data"][0];
  double longitude = pDoc["data"][1];

  // Print values.
  /*Serial.println(sensor);
  Serial.println(time);
  Serial.println(latitude, 6);
  Serial.println(longitude, 6);*/
}
