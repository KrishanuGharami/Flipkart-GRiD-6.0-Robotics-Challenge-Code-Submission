import os
import cv2
import numpy as np

def load_images_from_folder(folder):
    images = []
    labels = []
    for label in ['fresh', 'rotten']:
        label_folder = os.path.join(folder, label)
        for filename in os.listdir(label_folder):
            img_path = os.path.join(label_folder, filename)
            img = cv2.imread(img_path)
            if img is not None:
                img = cv2.resize(img, (100, 100))  # Resize images to 100x100
                images.append(img)
                labels.append(0 if label == 'fresh' else 1)  # 0 for fresh, 1 for rotten
    return np.array(images), np.array(labels)

if __name__ == "__main__":
    folder = "../data/"
    images, labels = load_images_from_folder(folder)
    np.save('images.npy', images)
    np.save('labels.npy', labels)
    print("Images and labels have been saved.")
