import { Popup } from "../components/Popup.js";

export class PopupWithProfile extends Popup {
  constructor(selectorPopup, callBackSubmit) {
    super(selectorPopup,);
    this._callBackSubmit = callBackSubmit;
    this._submitForm = this._submitForm.bind(this);
    this._input = this._popup.querySelector('.popup__info_type_profile-edit');
  }

  _getInputValues() {
    // collect data all forms
    return this._input.value
  }

  //eventlisteners super
  setEventListeners() {
    // add form submission handler
    super.setEventListeners()
    this._form = this._popup.querySelector('.popup__form_profile-edit')

    this._form.addEventListener('submit', this._submitForm)
  }

  _submitForm(evt) {
    this._callBackSubmit(this._getInputValues())
    evt.preventDefault();
    this.close();
  }

  close() {
    super.close();
    this._form.reset()
    console.log(document.querySelector('.profile__avatar'));
  }
}