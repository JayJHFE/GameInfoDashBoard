import axios, { AxiosRequestConfig } from "axios";

// API 요청 유틸리티 함수
export async function axiosFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: T
) {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
