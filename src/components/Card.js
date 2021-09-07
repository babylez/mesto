import { popupBigImg, picturePopupBigImg } from '../constants.js';
import { openPopup } from '../../pages/index.js';


export default class Card {

  constructor(name, link, cardSelector, elementSelector) {
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
    this._elementSelector = elementSelector
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(this._elementSelector)
      .cloneNode(true)
    return this._cardElement
  }

  render() {
    this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardElement.querySelector('.element__image').src = this._link;
    this._cardElement.querySelector('.element__image').alt = this._name;
    return this._cardElement
  }

  //add like or remove like
  _likeCard() {
    this._cardElement.querySelector('.element__button')
      .classList.toggle('element__button_type_active');
  }

  //delete card
  _deleteItem() {
    this._cardElement.remove();
  }

  // listeners on like/delete
  _setEventListeners() {
    this._cardElement.querySelector('.element__button').addEventListener('click', () => {
      this._likeCard()
    })

    this._cardElement.querySelector('.element__delet').addEventListener('click', () => {
      this._deleteItem()
    })

    this._cardElement.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImage()
    })
  }
  //open popup with image
  _openPopupImage() {
    openPopup(popupBigImg)
    picturePopupBigImg.alt = this._name;
    picturePopupBigImg.src = this._link;
    document.querySelector('.popup-img__caption').textContent = this._name
  }
}

