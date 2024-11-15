import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.utils import to_categorical

# Load preprocessed data
images = np.load('./images.npy')
labels = np.load('./labels.npy')

# Normalize images
images = images.astype('float32') / 255.0

# One-hot encode labels
labels = to_categorical(labels)

# Build a simple CNN model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(2, activation='softmax')  # Two classes: fresh and rotten
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(images, labels, epochs=10, batch_size=32)

# Save the trained model
model.save('model.h5')
print("Model trained and saved.")
