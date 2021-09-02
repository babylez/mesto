export class FormValidator {
  constructor(data, formElement) {
    this.formSelector = data.formSelector
    this.inputSelector = data.inputSelector
    this.submitButtonSelector = data.submitButtonSelector
    this.inputErrorClass = data.inputErrorClass
    this.errorClass = data.errorClass
    this.formElement = formElement;
    this.inputsList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
  }

  _toggleButtonState() {
    const hasInValidInput = this.inputsList.some((inputElement) =>
      !inputElement.validity.valid)
    const buttonElement = this.formElement.querySelector(this.submitButtonSelector);
    if (hasInValidInput) {
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.removeAttribute('disabled')
    }
  }


  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  //add text with error
  _showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //remove text with error
  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.textContent = '';
  }


  _setEventListeners() {
    this.inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      })
    })
    this._toggleButtonState()
  }

  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners();
  }
}
