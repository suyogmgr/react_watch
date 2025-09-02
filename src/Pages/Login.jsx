import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Hardcoded admin check
    if (email === 'admin@example.com' && password === 'admin123') {
      alert('Admin login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify({ email, isAdmin: true }));
      navigate('/admin'); // redirect to admin panel
      return;
    }

    // Normal user check
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert('Login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/'); // redirect to homepage or checkout
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-2 font-semibold">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
