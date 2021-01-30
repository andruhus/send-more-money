import { useEffect, useState } from "react";
import axios from "axios";

export const useGet = <RESPONSE_TYPE,>(
  url: string
): [
  () => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  { message: string } | undefined
] => {
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<{ message: string }>();
  const [update, setUpdate] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let resp = (await axios.get(url)).data;
        setResponseData(resp);
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setIsLoading(false);
    };
    getData();
  }, [url, update]);

  return [() => setUpdate({}), responseData, isLoading, error];
};
