import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');

        // Redirect based on role
        if (data.role === 'Kid') {
          navigate('/register'); // Face registration page
        } else if (data.role === 'Parent') {
          navigate('/parent-dashboard');
        } else if (data.role === 'Doctor') {
          navigate('/doctor-dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-300 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-pink-500 hover:underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
