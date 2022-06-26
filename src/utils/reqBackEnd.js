import { BASE_API_URL, AUTH_API_URL } from "./constants.js";
import axios from "axios";

export const signUp = async (newUser) => {
  const response = await axios.post(`${AUTH_API_URL}/signup`, newUser);
  return response;
};

export const logIn = async (loginInfo) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, loginInfo);
  return response.data;
};

export const checkToken = async (token) => {
  const response = await axios.get(`${AUTH_API_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const apiBase = (token) => async (endpoint) => {
  const response = await axios.get(`${BASE_API_URL}/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const apiPost =
  (token) =>
  async (endpoint, method = "GET", payload) => {
    const response = await axios.post(`${BASE_API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const parsed = await response.json();

    return parsed;
  };
