/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "next/dist/server/api-utils";
import { useCallback, useState } from "react";

const useApi = <T extends (...args: any) => any>(request: T) => {
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setLoading] = useState(false);

  const call = useCallback(
    (param: Parameters<T>) => {
      setLoading(true);
      setError(null);
      return request(param)
        .then((res: any) => {
          setLoading(false);
          setError(null);
          return res;
        })
        .catch((err: any) => {
          setError(err as ApiError);
          setLoading(false);
          throw err;
        });
    },
    [request]
  );

  return [call, isLoading, error] as [typeof request, boolean, ApiError | null];
};

export default useApi;
