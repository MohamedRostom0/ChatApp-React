import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { API_DEFAULT_ERROR, API_DOMAIN } from "../constants";
import store from "../store";

interface GetChatRequestData {
  userId: string;
  token: string;
}

export interface MessageResponse {
  id: string;
  message: string;
  userId: string;
  timestamp: string;
  status: "sent" | "received";
}

export async function getUserChat({
  userId,
  token,
}: GetChatRequestData): Promise<MessageResponse[]> {
  let response: AxiosResponse | null = null;
  try {
    response = await axios.get(`${API_DOMAIN}/chat/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error: any) {
    throw error;
  }
}
