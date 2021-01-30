import { useEffect, useState } from "react";
import axios from "axios";

export const useGetById = <RESPONSE_TYPE,>(
  url: string
): [
  (id: number) => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  { message: string } | undefined
] => {
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<{ message: string }>();
  const [gettingId, setGettingId] = useState<number>();

  useEffect(() => {
    if (!gettingId) return;
    const getData = async (id: number) => {
      setIsLoading(true);
      try {
        let resp = (await axios.get(url + id)).data;
        setResponseData(resp);
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setIsLoading(false);
    };
    getData(gettingId);
  }, [url, gettingId]);

  return [setGettingId, responseData, isLoading, error];
};
