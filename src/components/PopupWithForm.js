import { Popup } from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmit, selectorForm,) {
    super(selectorPopup);
    this._callBackSubmit = callBackSubmit;
    this._selectorForm = selectorForm;
    this._onSubmitForm = this._onSubmitForm.bind(this)
  }


  _getInputValues() {
    // collect data all forms
    this._inputList = this._popup.querySelectorAll('.popup__info');
    this._formValue = {};
    this._inputList.forEach(input => {
      this._formValue[input.id] = input.value
    });
    return this._formValue
  }

  setEventListeners() {
    // add form submission handler
    super.setEventListeners()
    this._form = document.querySelector(this._selectorForm)
    this._popup.addEventListener('submit', this._onSubmitForm)

  }

  _onSubmitForm(evt) {
    evt.preventDefault();
    this._callBackSubmit(this._getInputValues())
    this.close();
  }

  close() {
    super.close();
    this._popup.removeEventListener('submit', this._onSubmitForm);
  }

}

export { PopupWithForm }


