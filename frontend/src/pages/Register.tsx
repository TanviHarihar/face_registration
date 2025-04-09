import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const webcamRef = useRef<Webcam | null>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleFaceRegistration = () => {
    setShowWebcam((prev) => !prev);
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc || null);
      setShowWebcam(false);
      console.log("Captured Image: ", imageSrc);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!capturedImage) {
      alert("Please capture a face before submitting.");
      return;
    }

    const patientData = {
      fullName,
      email,
      dob,
      gender,
      location,
      faceImage: capturedImage,
    };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Server response:', data);
        alert('Patient registered successfully!');
      } else {
        console.error('Server error:', response.statusText);
        alert('Something went wrong during registration.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to connect to server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg sm:px-8 md:px-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Patient Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            {showWebcam && (
              <div className="rounded-lg overflow-hidden border-2 border-gray-300">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={250}
                  videoConstraints={{ facingMode: 'user' }}
                />
              </div>
            )}

            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="w-32 h-32 object-cover rounded-full border-2 border-green-400"
              />
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleFaceRegistration}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
              >
                {showWebcam ? 'Cancel' : 'Register Face'}
              </button>

              {showWebcam && (
                <button
                  type="button"
                  onClick={capture}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Capture
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
