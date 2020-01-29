char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(13, OUTPUT);
  pinMode(6, OUTPUT);
  delay(1000);
  Serial.print("Ready\n");
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(13, HIGH);
  
  if (Serial.available() > 0) {
    analogWrite(6, 255);
    char cmd = Serial.read();

    switch(cmd) {
      case 'G':
        Serial.print(json);
        Serial.print("\n");
        break;
      case 'A':
        Serial.print("OK\n");
        break;
      default:
        Serial.print("BAD\n");
    }
    delay(2000);
    analogWrite(6, 0);
  }
  delay(1000);
}
