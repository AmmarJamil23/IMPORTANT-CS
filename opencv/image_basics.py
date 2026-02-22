import numpy as np

image = np.random.randint(0, 256, (5, 5) ,dtype=np.uint8)

# print("Original image")
# print(image)

# inverted = 255 - image

# print("\n Inverted image")
# print(inverted)

print("\nShape:", image.shape)
print("Data type:", image.dtype)
print("Max value:", image.max())
print("Min value:", image.min())


print("Dimensions:", image.ndim)
print("Total elements:", image.size)
print("Item size (bytes):", image.itemsize)
print("Total memory (bytes): ", image.nbytes)


color_img = np.random.randint(0, 256, (5, 5, 3), dtype=np.uint8)

print("\nColor Image Shape:", color_img.shape)
print("Color Image Dimensions: ", color_img.ndim)

# Access onr pixel
print("Pixel at (0, 0):", color_img[0, 0])

print(color_img.strides)


roi = color_img[1:4, 1:4]
print("ROI shape:", roi.shape)