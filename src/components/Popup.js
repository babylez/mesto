
export class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handlClickOverlay = this._handlClickOverlay.bind(this)
  }

  open() {
    //open.popup
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.addEventListener('click', this._handlClickOverlay);
  }

  close() {
    //close.popup
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    this._popup.removeEventListener('click', this._handlClickOverlay)
  }

  _handleEscClose(evt) {
    //close popup click on esc
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handlClickOverlay(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    // popup closing listeners
    this._buttonClosePopup = this._popup.querySelector('.popup__close')
    this._buttonClosePopup.addEventListener('click', () => this.close())
  }
}
