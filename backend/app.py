from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allows requests from your React frontend

# Create a directory to save images if it doesn't exist
os.makedirs("registered_faces", exist_ok=True)

@app.route('/register', methods=['POST'])
def register_patient():
    try:
        data = request.get_json()

        # Extract patient data
        full_name = data.get('fullName')
        email = data.get('email')
        dob = data.get('dob')
        gender = data.get('gender')
        location = data.get('location')
        face_image_base64 = data.get('faceImage')

        if not face_image_base64:
            return jsonify({'error': 'No face image provided'}), 400

        # Decode base64 image and save
        image_data = base64.b64decode(face_image_base64.split(',')[1])
        filename = f"{full_name.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
        image_path = os.path.join("registered_faces", filename)
        with open(image_path, 'wb') as f:
            f.write(image_data)

        # Optional: Store metadata somewhere like in a file/database (for now just log)
        print(f"Registered patient: {full_name}, email: {email}, image saved at {image_path}")

        return jsonify({'message': 'Patient registered successfully', 'imagePath': image_path}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
