# Smart Vision Technology for Quality Control

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)
![License](https://img.shields.io/badge/license-MIT-green)
![Hackathon](https://img.shields.io/badge/Flipkart%20GRiD%206.0-Robotics%20Challenge-9cf)

## Overview

**Smart Vision Technology for Quality Control** is an intelligent system designed to automate product inspection and quality assurance in retail, food, and manufacturing industries. Developed for the **Flipkart GRiD 6.0 - Robotics Challenge Hackathon 2024 (Level 2)**, the project integrates cutting-edge technologies such as:

- Optical Character Recognition (OCR)
- Infrared (IR) Sensor-based Counting
- Image Processing & Computer Vision
- Machine Learning & Deep Learning

By combining these technologies, the system improves **accuracy, efficiency, and consistency** in quality control processes such as:

- Product detail extraction (brand name, type)
- Pricing and expiry date detection
- Real-time product counting
- Freshness detection for perishable goods (e.g., apples)

---

## Features

### 🔍 OCR-Based Label Analysis
- Extracts **brand names** and **product types** from packaging.
- Automates inventory categorization and authenticity checks.

### 🏷️ Price & Expiry Date Detection
- Uses OCR to detect **MRP** and **expiry dates** from labels.
- Enhances consumer safety and pricing accuracy.

### 🔢 IR Sensor-Based Product Counting
- Tracks product flow on conveyors in real time.
- Improves inventory accuracy and reduces manual labor.

### 🍏 Produce Freshness Detection
- Image processing determines fruit freshness using **color** and **texture** analysis.
- Reduces food waste and ensures product quality.

---

## Tech Stack

- **Programming Language**: Python
- **Libraries & Frameworks**:
  - TensorFlow, Keras (Deep Learning)
  - OpenCV (Computer Vision)
  - Tesseract OCR (Text Extraction)
- **Hardware Integration**: Infrared Sensors (for counting mechanism)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/KrishanuGharami/smart-vision-quality-control.git
cd smart-vision-quality-control
```
### 2. Create Virtual Environment (optional but recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
### 3. Install Dependencies
```bash
pip install -r requirements.txt
```
### 4. Download Tesseract (for OCR)
https://github.com/tesseract-ocr/tesseract
### 5. Run the Application
```bash
python main.py
```

## Project Structure
```bash
smart-vision-quality-control/
│
├── data/                  # Sample images and datasets
├── models/                # Trained ML/DL models
├── scripts/               # Core OCR, IR, and image processing scripts
├── utils/                 # Helper functions
├── requirements.txt       # Dependencies
├── README.md              # Project documentation
└── main.py                # Entry point
```

## 📸 Screenshots
| Desktop View                                 | Mobile View                                |
| -------------------------------------------- | ------------------------------------------ |
| ![Desktop](https://github.com/user-attachments/assets/2c31a384-0e56-4de3-a33f-2325eac5d77d) | ![Mobile]() |

## Contributions
Contributions are welcome! Please fork the repository, make changes, and open a pull request. For major changes, kindly open an issue first to discuss what you'd like to change.

## Author
Krishanu Gharami – Developer / ML Engineer

## Acknowledgements
1. Flipkart GRiD 6.0 - Robotics Challenge Hackathon 2024
2. TensorFlow, OpenCV, Tesseract, and other open-source tools

## Contact
For any queries, feel free to reach out via [24krishanugharami@gmail.com] or open an issue on this repository.
