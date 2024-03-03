export const fetcher = <T>(
  endpoint: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {
  const token = sessionStorage.getItem("token");
  
  if (!token) {
    throw new Error("Token not found in sessionStorage.");
  }

  const url = new URL(String(endpoint), import.meta.env.VITE_API_BASE_URL);

  return fetch(url.toString(), {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Error fetching ${url}: ${error}`);
    });
};

export const fetcherGet = <T>(
  endpoint: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {
  const url = new URL(String(endpoint), import.meta.env.VITE_API_BASE_URL);

  return fetch(url.toString(), {
    ...options,
    headers: {
      ...options?.headers,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Error fetching ${url}: ${error}`);
    });
};
