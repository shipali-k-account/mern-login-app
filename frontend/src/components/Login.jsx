import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        password,
      });

      // Save token and user info
      setToken(res.data.token);
      setUser(res.data.user);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 5 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 5 }}
           />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#007bff', color: 'white', border: 'none', borderRadius: 5 }}>
          Login
        </button>
      </form>
    </div>
  );
}
