import { template, popupBigImg, picture } from './constants.js';
import { handleEsc } from './index.js';


export default class Card {

  constructor(name, link, cardSelector) {
    this._name = name
    this._link = link
    this.cardSelector = cardSelector
  }

  _getTemplate() {
    this.cardSelector = template
      .querySelector('.element').cloneNode(true)
    return this.cardSelector
  }

  render() {
    this.cardSelector = this._getTemplate();
    this._setEventListeners();
    this.cardSelector.querySelector('.element__title').textContent = this._name;
    this.cardSelector.querySelector('.element__image').src = this._link;
    this.cardSelector.querySelector('.element__image').alt = this._name;
    return this.cardSelector
  }

  //add like or remove like
  _likeCard() {
    this.cardSelector.querySelector('.element__button')
      .classList.toggle('element__button_type_active');
  }

  //delete card
  _deleteItem() {
    this.cardSelector.remove();
  }

  // listeners on like/delete
  _setEventListeners() {
    this.cardSelector.querySelector('.element__button').addEventListener('click', () => {
      this._likeCard()
    })

    this.cardSelector.querySelector('.element__delet').addEventListener('click', () => {
      this._deleteItem()
    })

    this.cardSelector.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupImage()
    })
  }
  //open popup with image
  _openPopupImage() {
    popupBigImg.classList.add('popup_opened');
    picture.alt = this._name;
    picture.src = this._link;
    document.querySelector('.popup-img__caption').textContent = this._name
    document.addEventListener('keyup', handleEsc);
  }
}

