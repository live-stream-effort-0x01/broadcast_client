export const fetcher = <T>(
    endpoint: RequestInfo | URL,
    options?: RequestInit
  ): Promise<T> => {
  
    var token = sessionStorage.getItem("token") 

    return fetch(import.meta.env.VITE_API_BASE_URL + endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  };
  export const fetcherGet = <T>(
    endpoint: RequestInfo | URL,
    options?: RequestInit
  ): Promise<T> => {
    return fetch(import.meta.env.VITE_API_BASE_URL + endpoint, {
      ...options,
      headers: {
        ...options?.headers,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  };
