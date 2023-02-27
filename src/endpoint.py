from flask import Flask, jsonify, request
import tensorflow as tf
import cv2
import numpy as np

app = Flask(__name__)

# Load the trained machine learning model
model = tf.keras.models.load_model('path/to/your/model')

# Define a function to preprocess the image
def preprocess_image(image):
    processed_image = cv2.resize(image,(256,256))
    return processed_image

# Define the API endpoint for receiving image uploads
@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image file from the request
    image_file = request.files['image']

    # Preprocess the image
    image = preprocess_image(image_file)

    # Make a prediction using the machine learning model
    prediction = model.predict(np.array([image]))

    # Convert the prediction to a JSON response
    response = {'result': int(prediction[0])}

    # Return the response to the client
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)