// Pin configuration
const int sensorPin = 2;  // Connect the infrared sensor's output pin to Arduino pin 2

// Variables
int objectCount = 0;      // Counter to keep track of the number of objects
int sensorState = 0;      // Current state of the sensor (HIGH or LOW)
int lastSensorState = 0;  // Previous state of the sensor

void setup() {
  pinMode(sensorPin, INPUT);  // Set sensor pin as input
  Serial.begin(9600);         // Initialize serial communication for debugging
}

void loop() {
  sensorState = digitalRead(sensorPin);  // Read the state of the sensor

  // Check if the sensor state has changed (object detected)
  if (sensorState != lastSensorState) {
    if (sensorState == HIGH) {
      objectCount++;  // Increment the object count when an object is detected
      Serial.print("Object detected! Count: ");
      Serial.println(objectCount);
    }

    // Delay to debounce the sensor (avoid multiple counts for a single object)
    delay(50);
  }

  lastSensorState = sensorState;  // Update the last sensor state for the next iteration
}
