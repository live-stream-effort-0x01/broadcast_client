const linkURL = import.meta.env.VITE_API_BASE_URL || 'http://broadcast.demothesoftwarepls.site/api/v1'
export const fetcher = <T>(
  endpoint: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {

  var token = sessionStorage.getItem("token")

  return fetch(linkURL + endpoint, {
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
  return fetch(linkURL + endpoint, {
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
