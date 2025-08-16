const baseUrl = "http://localhost:3001";
const baseHeaders = { "content-type": "application/json" };

function _checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(_checkRes);
}

function postItem(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(_checkRes);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: baseHeaders,
  }).then(_checkRes);
}

export { getItems, postItem, deleteItem };
