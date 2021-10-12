export class Api {

    constructor(authToken, url) {
        this._authToken = authToken;
        this._url = url
    }

    _checkAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authToken
            }
        })
            .then(this._checkAnswer)
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authToken
            }
        })
            .then(this._checkAnswer)
    }

    updateProfile({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkAnswer)
    }


    addCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._checkAnswer)
    }


    deleteCard(card) {
        return fetch(`${this._url}/cards/${card._id}`, {
            method: "DELETE",
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkAnswer)
    }

    changeLikeCardStatus(card, method) {
        return fetch(`${this._url}/cards/likes/${card._id}`, {
            method: method,
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkAnswer)
    }

    updateProfileAvatar(user) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(this._checkAnswer)
    }
}