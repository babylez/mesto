import './index.css';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import { initialCards } from "../utils/initialCards.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  config,
  formProfile,
  formCard,
  openPopupProfileButton,
  nameInput,
  jobInput,
  buttonOpenPopupAddCard,
  profileName,
  profileJob
} from '../utils/constants.js';

const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();

//попап картинки
function handleCardClick(name, link) {
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
section.renderItems();

//get card
function getSampleCard(el) {
  const card = new Card(el.name, el.link, '#card-template', '.element', () => {
    handleCardClick(el.name, el.link)
  });
  return card.render()
}

// popup create card
const popupCard = new PopupWithForm('.popup_content_place', (inputValues) => {
  const text = inputValues['title-input'];
  const url = inputValues['link-input'];
  const newCard = getSampleCard({ name: text, link: url });
  section.setNewItem(newCard);
}, '.form-card')
popupCard.setEventListeners()

//userinfo editing
const userInfo = new UserInfo('.profile__fullname', '.profile__job');

//create popup profile
const popupProfile = new PopupWithForm('.popup-profile', (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues['full-name-input'],
    info: inputValues['job-input']
  })
})


popupProfile.setEventListeners();

//listeners popup
buttonOpenPopupAddCard.addEventListener('click', () => {
  popupCard.open();
  validatorCard.resetValidation()
})

openPopupProfileButton.addEventListener('click', () => {
  popupProfile.open()
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name
  jobInput.value = userData.info
  validatorProfile.resetValidation()
})