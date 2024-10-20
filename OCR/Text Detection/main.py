import cv2
import easyocr
import re
import os

# Create a folder to save the images if it doesn't exist
if not os.path.exists('output'):
    os.makedirs('output')

# Initialize webcam
cap = cv2.VideoCapture(0)

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

threshold = 0.25
frame_count = 0

# Define regex patterns for specific fields
brand_pattern = re.compile(r"(brand|manufacturer|company):?\s*(\w+)", re.IGNORECASE)
pack_size_pattern = re.compile(r"(pack size|size):?\s*(\d+\s*\w+)", re.IGNORECASE)
expiry_pattern = re.compile(r"(expiry|exp):?\s*(\d{2}[/-]\d{2}[/-]\d{4})", re.IGNORECASE)
mrp_pattern = re.compile(r"(MRP|price|₹):?\s*₹?\s*(\d+\.?\d*)", re.IGNORECASE)

while True:
    ret, frame = cap.read()
    
    if not ret:
        break

    # Perform OCR on the frame
    text_ = reader.readtext(frame)

    # Variables to store extracted data
    brand_name = ""
    pack_size = ""
    expiry_date = ""
    mrp = ""

    for t_, t in enumerate(text_):
        bbox, text, score = t

        if score > threshold:
            # Convert bbox points to proper format
            top_left = tuple([int(val) for val in bbox[0]])
            bottom_right = tuple([int(val) for val in bbox[2]])

            # Draw rectangle and text on the frame
            cv2.rectangle(frame, top_left, bottom_right, (0, 255, 0), 2)
            cv2.putText(frame, text, top_left, cv2.FONT_HERSHEY_COMPLEX, 0.65, (255, 0, 0), 2)

            # Check for specific details
            if re.search(brand_pattern, text):
                brand_match = re.search(brand_pattern, text)
                brand_name = brand_match.group(2) if brand_match else ""

            if re.search(pack_size_pattern, text):
                pack_size_match = re.search(pack_size_pattern, text)
                pack_size = pack_size_match.group(2) if pack_size_match else ""

            if re.search(expiry_pattern, text):
                expiry_match = re.search(expiry_pattern, text)
                expiry_date = expiry_match.group(2) if expiry_match else ""

            if re.search(mrp_pattern, text):
                mrp_match = re.search(mrp_pattern, text)
                mrp = mrp_match.group(2) if mrp_match else ""

    # Print extracted details
    if brand_name:
        print(f"Brand Name: {brand_name}")
    if pack_size:
        print(f"Pack Size: {pack_size}")
    if expiry_date:
        print(f"Expiry Date: {expiry_date}")
    if mrp:
        print(f"MRP: ₹{mrp}")

    # Display the frame
    cv2.imshow('OCR in Real-time', frame)

    # Exit if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close windows
cap.release()
cv2.destroyAllWindows()