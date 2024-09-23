import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { API_DEFAULT_ERROR, API_DOMAIN } from "../constants";

// Define types for user login request and response
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function userLogin({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> {
  let response: AxiosResponse | null = null;
  try {
    response = await axios.post(
      `${API_DOMAIN}/auth/login`,
      qs.stringify({
        username: email,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error: any) {
    throw error;
  }

  if (
    response &&
    response.data &&
    response.data.message &&
    response.status !== 200
  ) {
    throw new Error(response.data.message || API_DEFAULT_ERROR);
  }

  return response && response.data ? response.data : null;
}

// Define types for user registration request and response
interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

interface RegisterResponse {
  user: any;
  token: string;
}

export async function userRegister({
  email,
  password,
  username,
}: RegisterCredentials): Promise<RegisterResponse> {
  let response: AxiosResponse | null = null;
  try {
    response = await axios.post(`${API_DOMAIN}/auth/signup`, {
      email,
      password,
      username,
    });
  } catch (error: any) {
    throw error;
  }

  if (response.status !== 201) {
    throw new Error(response.message || API_DEFAULT_ERROR);
  }

  return response.data;
}
