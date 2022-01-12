import { Popup } from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmit) {
    super(selectorPopup,);
    this._callBackSubmit = callBackSubmit;
    this._onSubmitForm = this._onSubmitForm.bind(this);
    this._inputList = this._popup.querySelectorAll('.popup__info');
  }

  _getInputValues() {
    // collect data all forms
    this._formValue = {};
    this._inputList.forEach(input => {
      this._formValue[input.id] = input.value
    });
    return this._formValue
  }

  setEventListeners() {
    // add form submission handler
    super.setEventListeners()
    this._form = this._popup.querySelector('.popup__form')
    this._form.addEventListener('submit', this._onSubmitForm)
  }

  setButtonText(phrase) {
    this._form.querySelector(".popup__save").textContent = phrase;
  }

  _onSubmitForm(evt) {
    evt.preventDefault();
    this._callBackSubmit(this._getInputValues())
  }

  close() {
    super.close();
    this._form.reset()
  }
}

export { PopupWithForm }


