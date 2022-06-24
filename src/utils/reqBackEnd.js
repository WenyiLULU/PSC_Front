import { BASE_API_URL, AUTH_API_URL } from "./constants.js";
import axios from "axios";

export const signUp = async (newUser) => {
  const response = await axios.post(`${AUTH_API_URL}/signup`, newUser);
  return response;
};

export const logIn = async (loginInfo) => {
  const response = await axios.post(`${AUTH_API_URL}/login`, loginInfo);
  return response;
};

export const checkToken = async (token) => {
  const response = await axios.get(`${AUTH_API_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const apiBase = async (endpoint)=>{

    return
}