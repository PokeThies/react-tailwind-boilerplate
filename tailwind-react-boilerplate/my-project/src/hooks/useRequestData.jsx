import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/* Examples of hooks */
/*
makeRequest(`users`);
makeRequest(`users`, "POST", { "Content-Type": "application/json" }, { name: "John Doe" });
makeRequest(`users/${id}`, "PUT", { "Content-Type": "application/json" }, { name: "Jane Doe" });
makeRequest(`users/${id}`, "DELETE");
*/
const domain = "http://localhost:8101";

interface RequestData {
  makeRequest: (
    url: string,
    method?: string,
    headers?: Record<string, string> | undefined,
    data?: any
  ) => Promise<void>;
  isLoading: boolean;
  data: any;
  error: boolean;
}

function useRequestData(): RequestData {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  const makeRequest = async (
    url: string,
    method: string = "GET",
    headers: Record<string, string> | undefined = undefined,
    data: any = null
  ): Promise<void> => {
    let response: AxiosResponse | undefined;
    setIsLoading(true);

    // Check if method is valid
    const validMethods = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
      "HEAD",
    ];
    if (!validMethods.includes(method.toUpperCase())) {
      console.error(`Invalid method: ${method}`);
      setError(true);
      setIsLoading(false);
      return;
    }

    // Default headers
    const defaultHeaders = {
      "x-api-key": import.meta.env.VITE_API_KEY,
    };

    // Merge default headers with provided headers
    const mergedHeaders = { ...defaultHeaders, ...headers };

    const options: AxiosRequestConfig = {
      url: `${domain}/${url}`,
      method: method,
      headers: mergedHeaders,
      data: data,
    };

    try {
      response = await axios.request(options);

      if (response && response.data !== undefined) {
        setData(response.data);
        setError(false);
      } else {
        setData(null);
        setError(true);
        throw new Error("Error: No data in response");
      }

      // Throw an error if the response status is not in the 2xx range
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setData(null);
      setError(true);
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { makeRequest, isLoading, data, error };
}

export default useRequestData;
