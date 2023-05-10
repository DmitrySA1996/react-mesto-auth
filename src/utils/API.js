class API {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleSendingRequest(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getRealUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async editProfileUserInfo(data) {
    const response = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleSendingRequest(response);
  }

  async addNewCard(data) {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleSendingRequest(response);
  }

  async addLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async removeCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async removeLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendingRequest(response);
  }

  async updateProfileUserAvatar(data) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleSendingRequest(response);
  }
}

const api = new API({
  url: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "4c774ee9-4e81-4dc7-a921-f3ea6d42f00e",
    "Content-Type": "application/json",
  }
});

export default api;
