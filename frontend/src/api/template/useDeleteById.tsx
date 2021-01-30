import { useEffect, useState } from "react";
import axios from "axios";

export const useDeleteById = (
  url: string,
): [
  (id: number) => void,
  boolean | undefined,
  { message: string } | undefined,
] => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<{ message: string }>();
  const [deletingId, setGettingId] = useState<number>();

  useEffect(() => {
    if (!deletingId) return;
    const getData = async (id: number) => {
      setIsLoading(true);
      try {
        await axios.delete(url + id);
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setIsLoading(false);
    };
    getData(deletingId);
  }, [deletingId]);

  return [setGettingId, isLoading, error];
};
