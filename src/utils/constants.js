const openPopupProfileButton = document.querySelector('.profile__edit');
const nameInput = document.querySelector('.popup__info_type_full-name');
const jobInput = document.querySelector('.popup__info_type_job');
const picturePopupBigImg = document.querySelector('.popup-img__img');
const popupBigImg = document.querySelector('.popup-img');
const buttonOpenPopupAddCard = document.querySelector('.profile__button')
const formProfile = document.querySelector('.form-profile')
const formCard = document.querySelector('.form-card')
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__info-error_active'
}

export {
  config,
  formProfile,
  formCard,
  openPopupProfileButton,
  nameInput,
  jobInput,
  picturePopupBigImg,
  popupBigImg,
  buttonOpenPopupAddCard,
}
