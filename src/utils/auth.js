import { baseUrl, baseHeaders, request } from "./api";

const register = (email, password, name, avatar) => {
  const url = `${baseUrl}/signup`;
  const options = {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ email, password, name, avatar }),
  };

  return request(url, options);
};

const authorize = (email, password) => {
  const url = `${baseUrl}/signin`;
  const options = {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ email, password }),
  };

  return request(url, options);
};

const validateLogin = (token) => {
  const url = `${baseUrl}/users/me`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  return request(url, options);
};

export { register, authorize, validateLogin };
