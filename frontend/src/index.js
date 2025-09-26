import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';


const token = localStorage.getItem('userToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
