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

  _onSubmitForm(evt) {
    evt.preventDefault();
    this._callBackSubmit(this._getInputValues())
    this.close();
    this._form.reset()
  }

  close() {
    super.close();
    //наставник сказал, что очищать поля при закрытии не нужно, так как если случайно закрыл форму ее придется заново заполнять
  }
}

export { PopupWithForm }


