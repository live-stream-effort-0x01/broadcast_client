export const fetcher = <T>(
    endpoint: RequestInfo | URL,
    options?: RequestInit
  ): Promise<T> => {
    // const token = sessionStorage.getItem("token");
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg5OTUyMjQsInVzZXJfaWQiOjN9.ulxvvZIZMYws8bYweXDHubrKCvqg25y2dAjKrNPUS1o';
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
  