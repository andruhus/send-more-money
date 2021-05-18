import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

export const usePost = <POST_TYPE, RESPONSE_TYPE>(
  urlParam: string
): [
  (id: number) => void,
  (data: POST_TYPE) => void,
  boolean | undefined,
  {
    error: ErrorResponse | undefined;
    isLoading: boolean | undefined;
  }
] => {
  const [url, setUrl] = useState<string>(urlParam);
  const [postingData, setPostingData] = useState<POST_TYPE>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [responseErrorAndLoading, setResponseError] = useState<{
    error: ErrorResponse | undefined;
    isLoading: boolean | undefined;
  }>({ error: undefined, isLoading: undefined });

  useEffect(() => {
    if (!url) return;
    if (!postingData) return;
    (async (data: POST_TYPE) => {
      setIsLoading(true);
      setResponseError((prevState) => ({
        error: prevState.error,
        isLoading: true,
      }));
      try {
        const response = (await axios.post(url, data)).data;
        setResponseData(response);
        setResponseError(() => ({
          error: undefined,
          isLoading: false,
        }));
      } catch (e) {
        setResponseError((prevState) => ({
          error: {
            status: e.response?.status,
            message: e.response?.data,
          },
          isLoading: prevState.isLoading,
        }));
      }
      setIsLoading(false);
      setResponseError((prevState) => ({
        error: prevState.error,
        isLoading: false,
      }));
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
    responseErrorAndLoading,
  ];
};
