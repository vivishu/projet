#include <dht.h>

int ledRouge=3, ledVert=5;

dht DHT;

#define DHT11_PIN 7

void setup(){
  Serial.begin(9600);
}

void loop(){
  int chk = DHT.read11(DHT11_PIN);
 Serial.println("temperature");
  Serial.println(DHT.temperature);
  delay(5000);
  if (DHT.temperature>26)
  {
    digitalWrite(ledRouge, HIGH);
    digitalWrite(ledVert, LOW);
  }
  else
  {
    digitalWrite(ledRouge, LOW);
    digitalWrite(ledVert, HIGH);
  }
  
  
  
}
