import { isLoggedIn, getAccessToken } from "api/auth";
import { useState, useEffect } from "react";

export interface UseFetchParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  search?: object;
  headers?: object;
  useAuthorization: boolean;
  update?: boolean;
  disabled: boolean;
  disableOnUnauthorized?: boolean;
}

export interface UseFetchReturnType {
  data: any;
  isLoading: boolean;
  error: any;
  response: Response;
  unauthorized: boolean;
  forceUpdate(): void;
}

export default function useFetch({
  url,
  method = "GET",
  body,
  search,
  headers,
  useAuthorization,
  update = true,
  disabled,
  disableOnUnauthorized,
}: UseFetchParams): UseFetchReturnType {
  const [forceUpdateIndex, setForceUpdateIndex] = useState(0);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse]: [Response, any] = useState();
  const [error, setError]: [any, any] = useState();
  const [count] = useState({ value: 0 });
  function fetchUrl() {
    const countInFetch = count.value;
    const trimmedSearch =
      search &&
      Object.entries(search).reduce((reduced, [key, value]) => {
        if (value !== undefined) {
          reduced[key] = value;
        }
        return reduced;
      }, {});
    return fetch(`${url}?${new URLSearchParams(trimmedSearch).toString()}`, {
      method: method,
      body: body,
      headers: new Headers([
        ...Object.entries({
          ...headers,
          ...(method.toUpperCase() === "POST" && {
            "Content-Type": "application/json",
          }),
          ...(useAuthorization &&
            isLoggedIn() && { Authorization: getAccessToken() }),
        }),
      ]),
    })
      .then((res) => {
        if (count.value === countInFetch) {
          setResponse(res);
          if (res.ok) {
            return res.json();
          } else {
            throw res;
          }
        }
      })
      .then((data) => {
        if (count.value === countInFetch) {
          setData(data);
        }
      })
      .catch((error) => {
        if (count.value === countInFetch) {
          setError(error);
        }
      })
      .finally(() => {
        if (count.value === countInFetch) {
          setLoading(false);
        }
      });
  }
  useEffect(
    () => {
      setData(undefined);
      setLoading(true);
      setResponse(undefined);
      setError(undefined);
      if (useAuthorization && disableOnUnauthorized && !isLoggedIn()) {
        setError("unauthorized");
      } else if (!disabled) {
        count.value++;
        fetchUrl();
      }
    },
    update
      ? [
          url,
          body,
          ...Object.values(search || {}),
          ...Object.values(headers || {}),
          useAuthorization,
          isLoggedIn(),
          disabled,
          forceUpdateIndex,
        ]
      : []
  );
  return {
    data: data || {},
    isLoading,
    error,
    response: response,
    unauthorized: useAuthorization && !isLoggedIn(),
    forceUpdate: () => setForceUpdateIndex(forceUpdateIndex + 1),
  };
}
