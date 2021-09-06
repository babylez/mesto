export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector
    this._inputSelector = data.inputSelector
    this._submitButtonSelector = data.submitButtonSelector
    this._inputErrorClass = data.inputErrorClass
    this._errorClass = data.errorClass
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _toggleButtonState() {
    const hasInValidInput = this._inputsList.some((inputElement) =>
      !inputElement.validity.valid)

    if (hasInValidInput) {
      this.disableSubmitButton()
    } else {
      this._buttonElement.removeAttribute('disabled')
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
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //remove text with error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      })
    })
    this._toggleButtonState()
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners();
  }

  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
  }
}
