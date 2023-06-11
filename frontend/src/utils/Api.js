class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  async _fetch(path, method, body) {
    const answer = fetch(this._url + path, {
      method: method,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка запроса, код: ${res.status}`);
      })
    return answer;
  }

  getUserData() {
    return this._fetch("/users/me", "GET");
  }

  getStartedCardsPack() {
    return this._fetch("/cards", "GET");
  }

  editProfile({ name, about }) {
    return this._fetch("/users/me", "PATCH", { name, about });
  }

  addNewCard({ name, link }) {
    return this._fetch("/cards", "POST", { name, link });
  }

  editAvatar(avatar) {
    return this._fetch("/users/me/avatar", "PATCH", avatar);
  }

  removeCard(cardId) {
    return this._fetch(`/cards/${cardId}`, "DELETE");
  }

  setLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, "DELETE");
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  token: '0de5ee20-cdc3-41ba-9a09-6a93d92b63aa',
});
export default api;