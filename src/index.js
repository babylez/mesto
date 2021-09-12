import './styles/index.css';
import { PopupWithForm } from "./components/PopupWithForm.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import Card from "./components/Card.js";
import { Section } from "./components/Section.js";
import { initialCards } from "./initialCards.js"
import { PopupWithImage } from "./components/PopupWithImage.js";
import {
  config,
  formProfile,
  formCard,
  openPopupProfileButton,
  nameInput,
  jobInput,
  buttonOpenPopupAddCard,
} from './constants.js';

//попап картинки
function handleCardClick(name, link) {
  const imagePopup = new PopupWithImage('.popup-img');
  imagePopup.open(name, link)
}

//validation
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

//get card
function getSampleCard(el) {
  const card = new Card(el.name, el.link, '#card-template', '.element', () => {
    handleCardClick(el.name, el.link)
  });
  return card.render()
}

// popup create card
const popupCard = new PopupWithForm('.popup_content_place', (inputValues) => {
  const name = inputValues['title-input'];
  const url = inputValues['link-input']
  const card = new Card(name, url, '#card-template', '.element', () => {
    handleCardClick(name, url);
  })
  const renderedCard = card.render();
  section.setNewItem(renderedCard);

}, '.form-card')

//userinfo editing
const userInfo = new UserInfo('.profile__fullname', '.profile__job');

//create popup profile
const PopupProfile = new PopupWithForm('.popup-profile', () => {
  userInfo.setUserInfo(jobInput, nameInput)
}, '.form-profile');

//listeners popup
buttonOpenPopupAddCard.addEventListener('click', () => {
  popupCard.open();
})

openPopupProfileButton.addEventListener('click', () => {
  PopupProfile.open()
  validatorProfile.resetValidation()
})