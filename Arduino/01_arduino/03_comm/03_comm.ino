char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(13, OUTPUT);
  pinMode(6, OUTPUT);
  delay(1000);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(13, HIGH);
  Serial.print("Ready\n");
  if (Serial.available() > 0) {
    char buf[80];
    String str;
    byte len = 0;
  
    analogWrite(6, 255);
    len = Serial.readBytes(buf, 80);
    buf[len-1] = 0;

    delay(2000);
    str = (String)buf;
    if (str.indexOf("GET") == 0) {
      Serial.print(json);
      Serial.print("\n");
    } else if (str.indexOf("ACK") == 0) {
      Serial.print("OK\n");
    } else {
      Serial.print("BAD\n");
      for (int i=0; i<10; i++) {
        digitalWrite(13, digitalRead(13)^1);
        delay(200);
      }
    }
    analogWrite(6, 0);
    //digitalWrite(13, LOW);
    //Serial.end();
  }
  delay(1000);
}
