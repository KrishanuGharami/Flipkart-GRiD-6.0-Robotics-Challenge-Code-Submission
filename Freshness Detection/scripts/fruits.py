import cv2
import numpy as np
from tensorflow.keras.models import load_model
from collections import deque

# Load the trained model once
try:
    model = load_model('./model.h5')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    exit()

# Function to generate explanations based on features
def generate_explanation(label, features):
    if label == 'Fresh': 
        explanation = f"The fruit is fresh because it has a {features['color']} color and a {features['texture']} texture."
    else:
        explanation = f"The fruit is rotten because it shows {features['spots']} and has a {features['texture']} texture."
    return explanation

# Enhanced detection function with ROI handling
def detect_apple(image):
    try:
        if image is None or image.size == 0:
            return "No Fruit detected", None

        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # Color ranges
        lower_red1 = np.array([0, 100, 100])
        upper_red1 = np.array([10, 255, 255])
        lower_red2 = np.array([160, 100, 100])
        upper_red2 = np.array([180, 255, 255])
        lower_green = np.array([30, 40, 40])
        upper_green = np.array([85, 255, 255])

        mask_red1 = cv2.inRange(hsv, lower_red1, upper_red1)
        mask_red2 = cv2.inRange(hsv, lower_red2, upper_red2)
        mask_green = cv2.inRange(hsv, lower_green, upper_green)
        apple_mask = cv2.bitwise_or(mask_red1, mask_red2)
        apple_mask = cv2.bitwise_or(apple_mask, mask_green)

        # Detect round apple-like shapes
        circles = cv2.HoughCircles(apple_mask, cv2.HOUGH_GRADIENT, dp=1.2, minDist=50, param1=50, param2=30, minRadius=20, maxRadius=100)

        if circles is not None:
            circles = np.round(circles[0, :]).astype("int")
            for (x, y, r) in circles:
                # Drawing circular bounding box for better visualization
                cv2.circle(image, (x, y), r, (0, 255, 0), 4)

            # Preprocess ROI for model prediction
            img = cv2.resize(image, (100, 100)).astype('float32') / 255.0
            img = np.expand_dims(img, axis=0)

            # Prediction and explanation
            prediction = model.predict(img)
            label = 'Fresh' if np.argmax(prediction) == 0 else 'Rotten'

            # Generate a simple explanation based on detected features
            features = {
                'color': 'red' if np.sum(mask_red1) > np.sum(mask_green) else 'green',
                'texture': 'smooth' if label == 'Fresh' else 'wrinkled',
                'spots': 'no visible spots' if label == 'Fresh' else 'dark spots'
            }
            explanation = generate_explanation(label, features)
            return label, explanation
        else:
            return "No Fruit detected", None

    except Exception as e:
        print(f"Error processing image: {e}")
        return "Error", None

# Initialize webcam feed with error handling
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open video stream.")
    exit()

# Variables for debouncing and smoothing
frame_skip = 2  # Process every nth frame for better performance
frame_count = 0
prediction_buffer = deque(maxlen=10)  # Buffer to store last 10 predictions
debounce_threshold = 50  # Number of frames to hold a stable decision
debounce_counter = 0
final_label = None

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame.")
        break

    frame_count += 1
    if frame_count % frame_skip != 0:
        continue  # Skip frames for better performance

    # Define circular ROI
    center_x, center_y, radius = 300, 200, 100
    cv2.circle(frame, (center_x, center_y), radius, (0, 255, 0), 2)

    # Create a mask for the circular ROI
    mask = np.zeros_like(frame)
    cv2.circle(mask, (center_x, center_y), radius, (255, 255, 255), -1)
    circular_roi = cv2.bitwise_and(frame, mask)

    # Crop the circular region of interest
    roi = circular_roi[center_y - radius:center_y + radius, center_x - radius:center_x + radius]

    # Get the label and explanation for the apple in the region of interest
    label, explanation = detect_apple(roi)

    if label != "No apple detected":
        # Add the current label to the buffer
        prediction_buffer.append(label)

        # Once the buffer is full, determine the majority label
        if len(prediction_buffer) == prediction_buffer.maxlen:
            # Majority voting: take the most frequent label in the buffer
            most_common_label = max(set(prediction_buffer), key=prediction_buffer.count)

            # Apply debouncing: only change the label if it's different from the current stable label
            if most_common_label != final_label:
                debounce_counter += 1
                if debounce_counter > debounce_threshold:
                    final_label = most_common_label
                    debounce_counter = 0  # Reset counter
            else:
                debounce_counter = 0  # Reset counter if label stays the same
    else:
        final_label = "No apple detected"

    # Display the final stable label and explanation
    cv2.putText(frame, final_label, (center_x - radius, center_y - radius - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
    if explanation:
        cv2.putText(frame, explanation, (center_x - radius, center_y + radius + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    cv2.imshow('Apple Detection', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()