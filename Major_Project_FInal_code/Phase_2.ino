#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ESPmDNS.h>
#include "SPIFFS.h"
//#include "ESPAsyncWebServer.h"
const char* ssid = "moto";
const char* password = "12345678";

const int output =16;

const int pwmChannel = 0;
const int pwmFrequency = 5000;
const int pwmResolution = 8;

String sliderValue = "0";
String timerSliderValue = "10";
unsigned long timerStartTime = 0;
bool timerRunning = false;

const char* PARAM_INPUT_PWM = "pwmValue";
const char* PARAM_INPUT_TIMER = "timerValue";
const char* PARAM_INPUT_TOGGLE = "toggleButton";

AsyncWebServer server(80);



String processor(const String& var) {
  if (var == "SLIDERVALUE") {
    return sliderValue;
  }
  if (var == "TIMERVALUE") {
    return timerSliderValue;
  }
  return String();
}

void setup() {
  Serial.begin(115200);

if(!SPIFFS.begin()){
     Serial.println("An Error has occurred while mounting SPIFFS");
     return;
}
 
WiFi.begin(ssid, password);
 
while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
}
 
Serial.println(WiFi.localIP());


  ledcSetup(pwmChannel, pwmFrequency, pwmResolution);
  ledcAttachPin(output, pwmChannel);

server.on("/index", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
});


server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/style.css", "text/css");
});

//  server.on("/", HTTP_GET, [](AsyncWebServerRequest* request) {
//    request->send_P(200, "text/html", index_html, processor);
//  });

  server.on("/slider", HTTP_GET, [](AsyncWebServerRequest* request) {
    String param = request->getParam("param")->value();
    String value = request->getParam("value")->value();
    if (param == "pwmValue") {
      sliderValue = value;
      ledcWrite(pwmChannel, sliderValue.toInt());
    } else if (param == "timerValue") {
      timerSliderValue = value;
    }
    request->send(200, "text/plain", "OK");
  });

  server.on("/toggle", HTTP_GET, [](AsyncWebServerRequest* request) {
    int state = request->getParam("state")->value().toInt();
    if (state == 1) {
      timerRunning = true;
      timerStartTime = millis();
    } else {
      timerRunning = false;
      ledcWrite(pwmChannel, 0); // Turn off the LED
    }
    request->send(200, "text/plain", "OK");
  });

  server.begin();
}

void loop() {
  if (timerRunning) {
    unsigned long currentTime = millis();
    unsigned long elapsedMillis = currentTime - timerStartTime;
    unsigned long timerDuration = timerSliderValue.toInt() * 1000; // Convert to milliseconds

    if (elapsedMillis >= timerDuration) {
      timerRunning = false;
      ledcWrite(pwmChannel, 0); // Turn off the LED
    }
  }
}
