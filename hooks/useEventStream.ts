/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";

interface UseEventStreamOptions<TData, TParams> {
  manual?: boolean;
  defaultParams?: TParams;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
}

const handleStream = <TData>(
  response: Response,
  onData: (data: TData | null) => void
) => {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let bufferObj: any;
  function read() {
    let hasError = false;
    reader?.read().then((result: any) => {
      buffer += decoder.decode(result.value, { stream: true });
      if (result.done) {
        return;
      }
      const lines = buffer.split("\n");
      try {
        lines.forEach((message) => {
          if (message.startsWith("data: ")) {
            // check if it starts with data:
            // console.log(message);
            try {
              bufferObj = JSON.parse(message.substring(6)); // remove data: and parse as json
            } catch (e) {
              console.log(e);
              // mute handle message cut off
              onData(null);
              return;
            }
            if (bufferObj.status === 400 || !bufferObj.event) {
              onData(null);
              hasError = true;
              return;
            }
            console.log(bufferObj);
            
            onData(bufferObj);
          }
        });
        buffer = lines[lines.length - 1];
      } catch (e: any) {
        console.log(e);
        hasError = true;
        return;
      }
      if (!hasError) {
        read();
      }
    });
  }
  read();
};

type DefaultIData = {
  id: string;
  answer: string;
  status: number;
};

const useEventStream = <TData extends DefaultIData, TParams extends any[] = []>(
  service: (...args: TParams) => Promise<Response>,
  options: UseEventStreamOptions<TData, TParams>
) => {
  const { manual = false, defaultParams } = options;
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const startRequest = useCallback(
    (...params: TParams) => {
      setLoading(true);
      setError(null);
      setData(null);
      service(...params)
        .then((response: Response) => {
          handleStream(response, (data: TData | null) => {
            if(!data) {
              return;
            }
            setData((prevData) => {
                return {
                  ...prevData,
                  ...data,
                  answer: prevData ?  prevData?.answer + data.answer : data.answer
                };
              })
          }
            
          );
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err);
            setLoading(false);
          }
        });
    },
    [service]
  );

  useEffect(() => {
    if (!manual) {
      startRequest(...defaultParams as TParams);
    }
  }, [defaultParams, manual, startRequest]);

  const stopRequest = useCallback(() => {
    setLoading(false);
  }, []);

  return { data, error, loading, startRequest, stopRequest };
};

export default useEventStream;
