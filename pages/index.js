import { PopupWithForm } from "../src/components/PopupWithForm.js";
import { FormValidator } from "../src/components/FormValidator.js";
import { UserInfo } from "../src/components/UserInfo.js";
import Card from "../src/components/Card.js";
import { Section } from "../src/components/Section.js";
import { initialCards } from "../src/initialCards.js"
import { PopupWithImage } from "../src/components/PopupWithImage.js";
import {
  popupList,
  openPopupProfileButton,
  closePopupButtons,
  popupProfile,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  elements,
  buttonOpenPopupAddCard,
  popupAddCard,
  formAddCard,
  linkInput,
  nameImgInput,
} from '../src/constants.js';
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__info-error_active'
}

//попап картинки
function handleCardClick(name, link) {
  const imagePopup = new PopupWithImage('.popup-img');
  imagePopup.open(name, link)
}


const formProfile = document.querySelector('.form-profile')
const formCard = document.querySelector('.form-card')

const validatorProfile = new FormValidator(config, formProfile)
const validatorCard = new FormValidator(config, formCard)

validatorCard.enableValidation();
validatorProfile.enableValidation();

const section = new Section({
  items: initialCards,
  renderer: (name, link) => {
    const element = getSampleCard(name, link);
    section.setItem(element)
  }
},
  '.elements'
)
section.renderItems()

//DOENST WORK
function getSampleCard(el) {
  const card = new Card(el.name, el.link, '#card-template', '.element', () => {
    handleCardClick(el.name, el.link)
  });
  return card.render()
}

const popupWithForm = new PopupWithForm('.popup_content_place', (inputValues) => {
  const name = inputValues['title-input'];
  const url = inputValues['link-input']
  const card = new Card(name, url, '#card-template', '.element', () => {
    handleCardClick(name, url);
  })
  const renderedCard = card.render();
  section.setNewItem(renderedCard);
  validatorCard.disableValidation()

}, '.form-card')

//userinfo editing
const userInfo = new UserInfo('.profile__fullname', '.profile__job');

const PopupProfile = new PopupWithForm('.popup-profile', () => {
  userInfo.setUserInfo(jobInput, nameInput)
}, '.form-profile');

//listeners popup
buttonOpenPopupAddCard.addEventListener('click', () => {
  popupWithForm.open();
})

openPopupProfileButton.addEventListener('click', () => {
  PopupProfile.open()
  validatorProfile.clearValidation(jobInput)
})