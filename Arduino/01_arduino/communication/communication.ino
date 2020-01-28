char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(13, OUTPUT);
  pinMode(6, OUTPUT);
  delay(5000);
  /*for (int i=0; i<10; i++) {
    Serial.print("Loop ");
    Serial.print(i);
    Serial.print("\n");
    delay(500);
  }*/
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(13, HIGH);
  
  if (Serial.available() > 0) {
    char buf[80];
    String str;
    byte len = 0;
  
    //Serial.println("AVAILABLE");
    analogWrite(6, 255);
    len = Serial.readBytes(buf, 80);
    buf[len-1] = 0;

    str = (String)buf;
    Serial.println(str);
    if (str.indexOf("GET") == 0) {
      delay(1000);
      Serial.print(json);
      Serial.print("\n");
    } else {
      for (int i=0; i<20; i++) {
        digitalWrite(13, digitalRead(13)^1);
        delay(200);
      }
    }
    analogWrite(6, 0);
    //digitalWrite(13, LOW);
    //Serial.end();
  }
}
