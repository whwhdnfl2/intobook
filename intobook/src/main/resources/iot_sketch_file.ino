#include <SoftwareSerial.h>
#include<stdlib.h>

SoftwareSerial BTSerial(3, 4); // 소프트웨어 시리얼 (TX,RX)
int lightInValue = 0;
int lightOutValue = 0;
int pressureValue = 0;

int lightIn = A0; // 조도 센서 연결 핀
int lightOut = A1; // 조도 센서 연결 핀
int pressure = A2; // 압력 센서 연결 핀
int led = 2; // LED 연결 핀
const int thresholdValue = 300; // 압력 센서의 절대 임계값
const int thresholdDiff = 200; // 조도 센서의 절대 임계값

void setup()
{
  pinMode(lightIn, INPUT);
  pinMode(lightOut, INPUT);
  pinMode(pressure, INPUT);

  pinMode(led, OUTPUT);
  digitalWrite(led, LOW); // LED를 초기에 꺼둠

  Serial.begin(9600);
  BTSerial.begin(9600);
  
}

void loop()
{
  char p[10];
  char li[10];
  char lo[10];

  // read the value from the sensor
  lightInValue = analogRead(lightIn);
  lightOutValue = analogRead(lightOut);
  pressureValue = analogRead(pressure);

  // print the sensor reading so you know its range
  Serial.print("In: ");
  Serial.print(lightInValue);

  itoa(lightInValue, li, 10);
  BTSerial.write( li );
  // Serial.print(  " " );
  // Serial.print(  li );
  BTSerial.write( " " );
  
  Serial.print("  Out: ");
  Serial.print(lightOutValue);

  itoa(lightOutValue, lo, 10);
  BTSerial.write( lo );
  // Serial.print(  " " );
  // Serial.print(  lo );
  BTSerial.write( " " );
  
  Serial.print("  pressure: ");
  Serial.println(pressureValue);

  itoa(pressureValue, p, 10);
  BTSerial.write( p );
  BTSerial.write( " " );

  // map the sensor reading to a range for the LED
  if( abs(lightOutValue - lightInValue) < 30 ){ 
    // analogWrite(led, map(lightInValue, 0, 1023, 0, 255));
    digitalWrite(led, HIGH);
  }else{
    digitalWrite(led, LOW);
  }
  
  delay(1000); 
}