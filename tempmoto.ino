
#include <Wire.h>
#include <Adafruit_SSD1306.h>
#include <TinyGPS++.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "DHT.h"
#include <SPI.h>
//#include "WiFi.h"
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 32 // OLED display height, in pixels
const char* serverName = "https://tempmotoweb.azurewebsites.net/api/medicoes";

//On ESP32: GPIO-21(SDA), GPIO-22(SCL)
#define OLED_RESET -1 //Reset pin # (or -1 if sharing Arduino reset pin)
#define SCREEN_ADDRESS 0x3C //See datasheet for Address
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define RXD2 16
#define TXD2 17
HardwareSerial neogps(1);

TinyGPSPlus gps;

double Latitude;
double Longitude;
double Velocidade;
double Altitude;
int Num_Satelites;

unsigned long ultima = 0;
const int pino_dht = 4; // pino onde o sensor DHT está conectado
float temperatura; // variável para armazenar o valor de temperatura
float umidade; // variável para armazenar o valor de umidade
DHT dht(pino_dht, DHT11); // define o pino e o tipo de DHT*/

void limpaDisplay();
void print_speed();
void posta();

void setup() {
  Serial.begin(115200);

  //Begin serial communication Arduino IDE (Serial Monitor)

  //Begin serial communication Neo6mGPS
  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);
  
  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }
  dht.begin();

  display.clearDisplay();
  display.display();
  
  delay(1000);
  
  limpaDisplay();
  display.print("Conectando wifi");
  display.display();
  
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();

 /*int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0) {
      Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN)?" ":"*");
      delay(10);
    }
  }
  Serial.println("");

  // Wait a bit before scanning again
  delay(5000);*/
  
  WiFi.begin("Netvirtua2250", "3403822250");
  limpaDisplay();
  display.print("Conectando a Netvirtua2250");
  display.display();
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    display.print(".");
    display.display();
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  
  limpaDisplay();
  display.print(WiFi.localIP());
  display.display();
  delay(5000);

}

void loop() {
  if(WiFi.status() == WL_CONNECTED){
    boolean newData = false;
    for (unsigned long start = millis(); millis() - start < 1000;)
    {
      while (neogps.available())
      {
  
        char c = neogps.read();
        //Serial.print(c);
        if (gps.encode(c))
        {
          newData = true;
        }
      }
    }
  
    //If newData is true
    if(newData == true)
    {
      newData = false;
      //Serial.print(gps.satellites.value());
      print_speed();
    }
    else
    {
      limpaDisplay();
      display.print("Esperando conexao gps");
      display.display();
    }   
  }else{
    Serial.print("erro conexao, reconectando");
    WiFi.reconnect();
    while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  }
}

void limpaDisplay(){
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.setTextSize(1);
}

void print_speed()
{
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
       
  if (gps.location.isValid() == 1)
  {
    
    Latitude = gps.location.lat();
    Longitude = gps.location.lng();
    Velocidade = gps.speed.kmph();
    Altitude = gps.altitude.meters();
    Num_Satelites = gps.satellites.value();
   //String gps_speed = String(gps.speed.kmph());
    display.setTextSize(1);
    
    display.setCursor(0, 0);
    display.print("Lat: ");
    //display.setCursor(, 0);
    display.println(Latitude,6);

    //display.setCursor(25, 20);
    display.print("Lng: ");
    //display.setCursor(50, 20);
    display.println(Longitude,6);

    /*//display.setCursor(25, 35);
    display.print("Speed: ");
    //display.setCursor(65, 35);
    display.println(gps.speed.kmph());
    
    //display.setTextSize(1);
    //display.setCursor(0, 50);
    display.print("SAT:");
    //display.setCursor(25, 50);
    display.println(gps.satellites.value());

    //display.setTextSize(1);
    //display.setCursor(70, 50);
    display.print("ALT:");
    //display.setCursor(95, 50);
    display.println(gps.altitude.meters(), 0);*/
    temperatura = dht.readTemperature(); // lê a temperatura em Celsius
  umidade = dht.readHumidity(); // lê a umidade

  // Se ocorreu alguma falha durante a leitura
  if (isnan(umidade) || isnan(temperatura)) {
    Serial.println("Falha na leitura do Sensor DHT!");
    display.println("Falha na leitura do Sensor DHT ");
    display.display();
  }
  else { // Se não
    // Imprime o valor de temperatura  
    display.print("Temp: ");
    display.print(temperatura);
    display.println(" *C ");
    display.display();

    // Imprime o valor de umidade
    display.print("Umi: ");
    display.print(umidade);
    display.print(" %"); 
    
    display.println(); // nova linha
    //display.display();
    posta();


  }

    display.display();
    
  }
  else
  {
    limpaDisplay();
    display.print("Sem conexao GPS");
    display.display();
  } 
  delay(500);
}

void posta(){
  if(millis() - ultima >= 60000){
    ultima = millis();
    
    limpaDisplay();
    display.println("postando medicoes");
    display.display();
  WiFiClientSecure *client = new WiFiClientSecure;
    client->setInsecure(); //don't use SSL certificate
    HTTPClient https;
    
    // Your Domain name with URL path or IP address with path
    https.begin(*client, serverName);
    
    // Specify content-type header
    https.addHeader("Content-Type", "application/json");
    
    // Prepare your HTTP POST request data
    String httpRequestData = "{\"Latitude\": "+String(Latitude,6)+",\"Longitude\": "+String(Longitude,6)+",\"Temperatura\": "+String(temperatura,2)+",\"Umidade\": "+String(umidade,2)+",\"Num_Satelites\": "+String(Num_Satelites)+",\"Velocidade\": "+String(Velocidade)+",\"Altitude\": "+String(Altitude,2)+"}";
        //String httpRequestData = "{\"Latitude\": 0,\"Longitude\": 0,\"Temperatura\": 0,\"Umidade\": 0,\"Num_Satelites\": 0,\"Velocidade\": 0,\"Altitude\": 0}";

    Serial.print("httpRequestData: ");
    Serial.println(httpRequestData);
    int httpResponseCode = https.POST(httpRequestData);
    
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      display.print("Cod Resp:");
      display.print(httpResponseCode);
      display.display();
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      
      display.print("Erro postagem:");
      display.print(httpResponseCode);
      display.display();
    }
    // Free resources
    https.end();
    delay(2000);
    limpaDisplay();
  }
}
