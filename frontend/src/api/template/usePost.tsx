import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

export const usePost = <POST_TYPE, RESPONSE_TYPE>(
  urlParam: string
): [(id: number) => void, (data: POST_TYPE) => void, boolean | undefined] => {
  const [url, setUrl] = useState<string>(urlParam);
  const [postingData, setPostingData] = useState<POST_TYPE>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    if (!url) return;
    if (!postingData) return;
    (async (data: POST_TYPE) => {
      setIsLoading(true);
      try {
        const response = (await axios.post(url, data)).data;
        setResponseData(response);
      } catch (e) {
        setError({ status: e.response?.status, message: e.response?.data });
      }
      setIsLoading(false);
    })(postingData);
  }, [url, postingData]);

  return [
    (id: number) => {
      setUrl(`${url}/${id}`);
    },
    (data: POST_TYPE) => {
      setPostingData(data);
    },
    isLoading,
  ];
};
