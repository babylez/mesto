export class FormValidator {
  constructor(data, formElement) {
    this.formSelector = data.formSelector
    this.inputSelector = data.inputSelector
    this.submitButtonSelector = data.submitButtonSelector
    this.inputErrorClass = data.inputErrorClass
    this.errorClass = data.errorClass
    this.formElement = formElement;
    this.inputElement = formElement.querySelector(this.inputSelector)
    this.errorElement = this.formElement.querySelector(`.${this.inputElement.id}-error`)
    this.inputsList = Array.from(this.formElement.querySelector(this.inputSelector))
  }

  _toggleButtonState = () => {
    const hasInValidInput = this.inputsList.some(() =>
      !this.inputElement.validity.valid)
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    if (hasInValidInput === false) {
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.removeAttribute('disabled')
    }
  }


  _checInputValidity() {
    if (!this.inputElement.validity.valid) {
      this._showInputError()
    } else {
      this._hideInputError()
    }
  }

  //add text with error
  _showInputError = () => {
    this.inputElement.classList.add(this.inputErrorClass);
    this.errorElement.textContent = this.inputElement.validationMessage;
    this.errorElement.classList.add(this.errorClass)
  }

  //remove text with error
  _hideInputError() {
    this.inputElement.classList.remove(this.inputErrorClass);
    this.errorElement.classList.add(this.errorClass)
    this.errorElement.textContent = '';
  }



  _setEventListeners() {
    this.inputsList.forEach(() => {
      this.inputElement.addEventlistener('input', () => {
        this._checInputValidity();
        this._toggleButtonState()
      })
    })
    this._toggleButtonState()
  }

  enableValidation() {
    console.log(this.inputsList)
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners();
  }
}
