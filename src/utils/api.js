import { getToken } from "./token";

const baseUrl = "http://localhost:3001";
const baseHeaders = { "content-type": "application/json" };

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((data) => {
      return data;
    });
}

function postItem(name, imageUrl, weather) {
  const token = getToken();
  if (!token) { return Promise.reject("Unauthorized"); }

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteItem(_id) {
  const token = getToken();
  if (!token) { return Promise.reject("Unauthorized"); }

  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  getItems,
  postItem,
  deleteItem,
  checkResponse,
  request,
  baseUrl,
  baseHeaders,
};
