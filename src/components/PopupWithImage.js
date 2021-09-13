import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  open(name, link) {
    this._link = this._popup.querySelector('.popup-img__img');
    this._name = this._popup.querySelector('.popup-img__caption');
    this._link.src = link;
    this._link.alt = name;
    this._name.textContent = name;
    super.open();
  }
  setEventListeners(name, link) {
    super.setEventListeners();
    this.open(name, link)
  }
}
