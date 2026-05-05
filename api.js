// src/api.js
import axios from 'axios';

// Base URL for API
const API_URL = "http://127.0.0.1:8000/api/";

// Create axios instance


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // make sure /api/ is correct
});




export const loginUser = (email, password) =>
  axios.post(`${API_URL}login/`, { email, password });

export const registerUser = (name, email, password) =>
  axios.post(`${API_URL}register/`, { name, email, password });

export const getUserProfile = (token) =>
  axios.get(`${API_URL}profile/`, { headers: { Authorization: `Bearer ${token}` } });

export const updateUserProfile = (data, token) =>
  axios.put(`${API_URL}profile/`, data, { headers: { Authorization: `Bearer ${token}` } });
// ------------------- Auth APIs -------------------

// Signup
export const signup = (username, password) => {
  return api.post('signup/', { username, password });
};

// Login


// ------------------- Profile APIs -------------------

// Create/Upload profile
export const uploadProfile = (formData, token) => {
  return api.post('profile/', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Get profile
export const getProfile = (userId, token) => {
  return api.get(`profile/${userId}/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Update profile
export const updateProfile = (userId, data, token) => {
  return api.put(`profile/${userId}/`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Recommendations
export const getRecommendations = (token) => {
  return api.get('recommendations/', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Loan Apply (already correct)
export const applyLoan = (data, token) => {
  return api.post('applications/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

export default api;
