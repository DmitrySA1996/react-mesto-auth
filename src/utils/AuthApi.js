const url = "https://auth.nomoreparties.co"

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse)
}

export const login = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token)
        return data
      }
    })
}

export const checkToken = (jwt) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse)
}