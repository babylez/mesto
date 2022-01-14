export default class Card {

  _handleCardDelete;

  constructor(el, cardSelector, elementSelector, handleCardClick, deleteLikeRemoteHandler, setLikeRemoteHandler) {
    this._el = el
    this._name = el.name
    this._link = el.link
    this._likes = el.likes;
    this._owner = el.owner;
    this._cardSelector = cardSelector
    this._elementSelector = elementSelector
    this._handleCardClick = handleCardClick
    this._deleteLikeRemote = deleteLikeRemoteHandler;
    this._setLikeRemote = setLikeRemoteHandler;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(this._elementSelector)
      .cloneNode(true)
    return this._cardElement
  }


  setDeleteHandler(handler) {
    this._handleCardDelete = handler;
  }

  _showUserLiked() {
    //найти свой id среди всех остальных если он есть отобразить, что лайк стоит
    this._likes.forEach(user => {
      if (user._id === window.userId) {
        this._cardElement.querySelector('.element__button').classList.add('element__button_type_active')
      }
    });
  }

  render() {
    this._getTemplate();
    this._setEventListeners();
    if (this._likes.length) {
      this._showLikeCounter();
      this._showUserLiked()
    }
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardElement.querySelector('.element__image').src = this._link;
    this._cardElement.querySelector('.element__image').alt = this._name;
    this._cardElement.querySelector('.like-counter').textContent = this._likes.length
    this._chekId()
    return this._cardElement
  }

  _chekId() {

    if (window.userId !== this._owner._id) {
      this._cardElement.querySelector('.element__delet').style.display = "none";
    }
  }

  //this._deleteLikeRemote();
  //add like or remove like
  likeCard() {
    if (this._cardElement.querySelector('.element__button').classList.contains('element__button_type_active')) {
      this._cardElement.querySelector('.like-counter').textContent--;
      if (this._cardElement.querySelector('.like-counter').textContent === "0") this._hideLikeCounter();
    } else {
      this._setLikeRemote();
      if (this._cardElement.querySelector('.like-counter').textContent === "0") this._showLikeCounter();
      this._cardElement.querySelector('.like-counter').textContent++;
    }

    this._cardElement.querySelector('.element__button').classList.toggle('element__button_type_active');
  }

  _showLikeCounter() {
    this._cardElement.querySelector('.like-counter').classList.remove('like-counter_type_hidden')
  }

  _hideLikeCounter() {
    this._cardElement.querySelector('.like-counter').classList.add('like-counter_type_hidden')
  }

  //check delete

  _checkDelete() {
    const popupDel = document.querySelector('.popup-chek-delete-card')
      .classList.add('popup_opened')
  }

  //delete card
  deleteItem() {
    this._cardElement.remove();
  }

  // listeners on like/delete
  _setEventListeners() {
    this._cardElement.querySelector('.element__button').addEventListener('click', () => {
      this._deleteLikeRemote()
    })

    this._cardElement.querySelector('.element__delet').addEventListener('click', () => {
      this._handleCardDelete();

    })

    this._cardElement.querySelector('.element__image').addEventListener('click', this._handleCardClick)
  }
}