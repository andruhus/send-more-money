import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorResponse } from "./ErrorResponse";

export const usePut = <PUT_TYPE, RESPONSE_TYPE>(
  urlParam: string
): [
  (data: PUT_TYPE, url?: string) => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  ErrorResponse | undefined
] => {
  const [url, setUrl] = useState<string>(urlParam);
  const [puttingData, setPuttingData] = useState<PUT_TYPE>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<ErrorResponse>();

  useEffect(() => {
    if (!url) return;
    if (!puttingData) return;
    (async (data: PUT_TYPE) => {
      setIsLoading(true);
      try {
        const response = (await axios.put(url, data)).data;
        setResponseData(response);
      } catch (e) {
        setError({ status: e.response?.status, message: e.response?.data });
      }
      setIsLoading(false);
    })(puttingData);
  }, [url, puttingData]);

  return [
    (data: PUT_TYPE, url?: string) => {
      url && setUrl(url);
      setPuttingData(data);
    },
    responseData,
    isLoading,
    error,
  ];
};
