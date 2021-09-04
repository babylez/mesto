
import { FormValidator } from "./FormValidator.js";
import Card from "./card.js";
import { initialCards } from "./initialCards.js";
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
} from './constants.js';
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__info-error_active'
}

const formProfile = document.querySelector('.form-profile')
const formCard = document.querySelector('.form-card')

const validatorProfile = new FormValidator(config, formProfile)
const validatorCard = new FormValidator(config, formCard)

validatorCard.enableValidation();
validatorProfile.enableValidation();


function lol(el) {
  const card = new Card(el.name, el.link, '.element');
  return card.render()
}
//create card from array
initialCards.forEach(item => {
  document.querySelector('.elements').append(lol(item));
})


// Открытие всех попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEsc);
}

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEsc);
}

//закрытие по кнопке esc
export function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

// закрытие попапов при клике на оверлей
popupList.forEach((activePopup) => {
  activePopup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(activePopup);
    }
  })
})

closePopupButtons.forEach(el => el.addEventListener('click', () =>
  closePopup(el.closest('.popup'))));

//попап профиль 
function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function saveInfoProfile(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}

//кнопка плюс кнопка закрыть
function openPopupAddCard() {
  openPopup(popupAddCard);
}

// добавить карточки из формы
function addCard(event) {
  event.preventDefault();
  console.log(nameImgInput);
  elements.prepend(lol({ name: nameImgInput.value, link: linkInput.value }));
  closePopup(popupAddCard)
  linkInput.value = '';
  nameImgInput.value = '';
  validatorCard.disableSubmitButton();
}

// слушальщики

openPopupProfileButton.addEventListener('click', openPopupProfile);

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

popupProfile.addEventListener('submit', saveInfoProfile);

formAddCard.addEventListener('submit', addCard);
