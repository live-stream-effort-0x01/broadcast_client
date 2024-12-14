const linkURL = import.meta.env.VITE_AUTH_API_URL|| 'http://localhost:8080/api/v1'

export const authLogin = (email: string, password: string) => {
  return fetch(`${linkURL }/guest/signup`, {
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
  // username: string,
  email: string,
  password: string
) => {
  return fetch(`${linkURL}/guest/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Thêm header này
    },
    body: JSON.stringify({
     email: email,
     password:  password

    }),
  })
  .then((response) => response.json())
 .catch((error) => {
  return error.json()
 });
};

export const isLogin = (
) => {
  const user_id = sessionStorage.getItem('user_id')
  if(user_id&& user_id !==''){
    return true
  }
    else
    {
      return false
    }

};
