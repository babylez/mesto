const showInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, ...rest } = config;
  // show error 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass)
}

const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, ...rest } = config;
  //hide error 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
  //find error
}

//show/hide error
const checInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

const hazInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (buttonElement, inputList) => {
  //condition active button
  if (hazInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

//find inputs, find button, add listeners for each input
const setEventListeners = (formElement, config) => {
  const { inputSelector, submitButtonSelector, ...rest } = config;
  // prevent reload 
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })

  //find input
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  //find button 
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      // check input valid
      checInputValidity(formElement, inputElement, rest);
      toggleButtonState(buttonElement, inputList);
    });
  })
}

// find forms, add listeners for each form
export const enableValidation = (config) => {
  const { formSelector, ...rest } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, rest);
  });
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__info-error_active'
}

enableValidation(config)
