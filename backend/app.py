from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import base64
import os
import cv2
import numpy as np
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- Setup Directories and MongoDB ---
os.makedirs("registered_faces", exist_ok=True)

client = MongoClient("mongodb://localhost:27017/")
db = client["face_login_db"]
users_collection = db["users"]

# Load Haar Cascade for Face Detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


# --- Signup Route ---
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        full_name = data.get('fullName')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if not all([full_name, email, password, role]):
            return jsonify({"message": "Missing required fields"}), 400

        if users_collection.find_one({"email": email}):
            return jsonify({"message": "Email already registered"}), 400

        hashed_password = generate_password_hash(password)

        users_collection.insert_one({
            "fullName": full_name,
            "email": email,
            "password": hashed_password,
            "role": role
        })

        return jsonify({"message": "Signup successful"}), 200

    except Exception as e:
        print("Signup error:", e)
        return jsonify({"message": "Internal server error"}), 500


# --- Login Route ---
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = users_collection.find_one({"email": email})

        if not user or not check_password_hash(user['password'], password):
            return jsonify({"message": "Invalid email or password"}), 401

        return jsonify({
            "message": "Login successful",
            "role": user["role"],
            "fullName": user["fullName"]
        }), 200

    except Exception as e:
        print("Login error:", e)
        return jsonify({"message": "Internal server error"}), 500


# --- Face Registration (Only for Kids) ---
@app.route('/register', methods=['POST'])
def register_patient():
    try:
        data = request.get_json()
        full_name = data.get('fullName')
        email = data.get('email')
        dob = data.get('dob')
        gender = data.get('gender')
        location = data.get('location')
        face_image_base64 = data.get('faceImage')

        if not face_image_base64:
            return jsonify({'error': 'No face image provided'}), 400

        # Decode base64 image
        image_data = base64.b64decode(face_image_base64.split(',')[1])
        nparr = np.frombuffer(image_data, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect face
        gray = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        if len(faces) == 0:
            return jsonify({'error': 'No face detected. Please try again.'}), 400

        # Save the image
        filename = f"{full_name.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        image_path = os.path.join("registered_faces", filename)
        cv2.imwrite(image_path, img_np)

        # Update the existing user record with extra details
        result = users_collection.update_one(
            {"email": email},
            {
                "$set": {
                    "dob": dob,
                    "gender": gender,
                    "location": location,
                    "faceImagePath": image_path,
                    "registeredAt": datetime.now()
                }
            }
        )

        if result.matched_count == 0:
            return jsonify({'error': 'User not found. Please sign up first.'}), 400

        return jsonify({'message': 'Patient registered successfully', 'imagePath': image_path}), 200

    except Exception as e:
        print("Face Registration Error:", e)
        return jsonify({'error': str(e)}), 500


# --- Run Server ---
if __name__ == '__main__':
    app.run(debug=True)
