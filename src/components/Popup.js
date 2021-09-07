import { openPopupProfileButton } from "../constants.js";

export class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup
  }

  _handleEscClose() {
    //close popup click on esc
    console.log("Escape");
  }

  open() {
    //open.popup
    console.log(this._selectorPopup);
    //this._selectorPopup.classList.add('popup_opened');
    document.addEventListener('keyup', () => {
      this._handleEscClose()
    });
  }

  close() {
    //close.popup
  }

  setEventListeners() {
    // buttonClosePopup.addEventlistener('click', close)
    openPopupProfileButton.addEventListener('click', () => {
      this.open()
    })

    openPopupProfileButton.addEventListener('click', () => {
      this._handleEscClose()
    })
  }

}