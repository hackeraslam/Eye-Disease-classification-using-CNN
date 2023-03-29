from flask import Flask, jsonify, request
import tensorflow as tf
import cv2
import numpy as np
from PIL import Image
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# Load the trained machine learning model
model = tf.keras.models.load_model('.\\N_CAT-Model')

# Define a function to preprocess the image
def preprocess_image(image):
    # print(image)
    imgA = Image.open(image)

    # Resize the image
    img_resized = imgA.resize((256, 256))
    
    img = np.array(img_resized)
    # img = np.reshape(img, [256,256])
    # img = img.astype(np.float32)
    #
    # img = cv2.resize(img, (256,
    #                          256))
    # img = np.reshape(image, [256, 256, 3])

    return img

# Define the API endpoint for receiving image uploads
@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image file from the request
    image_file = request.files['image']
    # img = cv2.imread("C:\\Users\\aslam\\Dropbox\\PC\\Desktop\\Test1\\preprocessed_images\\0_left.jpg")
    # Preprocess the image
    image = preprocess_image(image_file)

    # Make a prediction using the machine learning model
    prediction = ( model.predict(np.array([image])) > 0.070).astype("int32")
    # prediction = model.predict(np.array([image]))
    print("Pred: ",prediction)
    # Convert the prediction to a JSON response
    # response = {'result': int(prediction[0])}
    response = {'result': int(prediction[0])}


    # Return the response to the client
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)