import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(selectorPopup, callBackSubmit) {
    super(selectorPopup);
    this._callBackSubmit = callBackSubmit;
    this._submitForm = this._submitForm.bind(this);
  }

  //eventlisteners super
  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector('form')
    this._form.addEventListener('submit', this._submitForm)
  }



  _submitForm(evt) {
    evt.preventDefault();
    this._callBackSubmit();
  }

  close() {
    super.close();
    this._form.reset()
  }
}