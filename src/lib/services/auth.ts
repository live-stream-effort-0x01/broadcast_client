export const authLogin = (email: string, password: string) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
     console.log(error)
     return error.json()
    });
};
export const authRegister = (
  username: string,
  email: string,
  password: string
) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/user/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
  .then((response) => response.json())
 .catch((error) => {
  return error.json()
 });
};
export const isLogin = (
) => {
  const token = sessionStorage.getItem('token')
  if(token&& token !==''){
    return true
  }
    else
    {
      return false
    }

};
