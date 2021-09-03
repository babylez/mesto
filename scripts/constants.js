const popupList = document.querySelectorAll('.popup');

const openPopupProfileButton = document.querySelector('.profile__edit');

const closePopupButtons = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector('.popup-profile');

const profileName = document.querySelector('.profile__fullname');
const profileJob = document.querySelector('.profile__job');

const nameInput = document.querySelector('.popup__info_type_full-name');
const jobInput = document.querySelector('.popup__info_type_job');

const elements = document.querySelector('.elements');
const template = document.querySelector('#card-template').content;

const picturePopupBigImg = document.querySelector('.popup-img__img');
const popupBigImg = document.querySelector('.popup-img');

const buttonOpenPopupAddCard = document.querySelector('.profile__button')

const popupAddCard = document.querySelector('.popup_content_place');

const formAddCard = document.querySelector('.popup__form_content_img');
const linkInput = document.querySelector('.popup__info_type_link');
const nameImgInput = document.querySelector('.popup__info_type_name-img');

export {
  popupList,
  openPopupProfileButton,
  closePopupButtons,
  popupProfile,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  elements,
  template,
  picturePopupBigImg,
  popupBigImg,
  buttonOpenPopupAddCard,
  popupAddCard,
  formAddCard,
  linkInput,
  nameImgInput
}