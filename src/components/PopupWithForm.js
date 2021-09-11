import { Popup } from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmit, selectorForm) {
    super(selectorPopup);
    this._callBackSubmit = callBackSubmit;

  }

  _getInputValues() {
    // collect data all forms
    console.log(this._popup);
    this._inputList = this._popup.querySelectorAll('.popup__info');
    this._formValue = {};
    console.log(this._formValue);
    this._inputList.forEach(input => {
      this._formValue[input.textContent] = input.value
    });
    console.log(this._formValue);
    return this._formValue
  }

  setEventListeners() {
    // add form submission handler
    super.setEventListeners()
    this._form = document.querySelector('.')
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBackSubmit(this._getInputValues())
    })

  }
  //close()
}


//const profileInfo = new UserInfo(profileTitle, profileSubTitle);
/*
const popupProfile = new PopupWithForm(popupProfileEdit, (data) => {
  profileInfo.setUserInfo(data);
  popupProfile.close();
  editProfileFormValidation.resetValidation();
});

setUserInfo(data) {
  if (data.username) {
    this._name.textContent = data.username;
  }
  if (data.description) {
    this._description.textContent = data.description;
  }
}*/






















export { PopupWithForm }


