import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { initialCards } from "./initialCards.js";
import {
  popupList,
  popup,
  openPopupButton,
  closePopupButtons,
  popupProfile,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  elements,
  buttonImg,
  popupImg,
  formImg,
  linkInput,
  nameImgInput
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
//create card from array
initialCards.forEach(item => {
  const element = new Card(item.name, item.link);
  document.querySelector('.elements').append(element.render());
})


// Открытие всех попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEsc);
}
// закрытие попапов
export function closePopup(Popup) {
  Popup.classList.remove('popup_opened');
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
function createPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function saveInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}

//кнопка плюс кнопка закрыть
function openPopupImg() {
  document.querySelector('.popup__save_content_img').disabled = true;
  openPopup(popupImg);
}

// добавить карточки из формы

function addCards(event) {
  const card = new Card(nameImgInput.value, linkInput.value)
  event.preventDefault();
  elements.prepend(card.render());
  closePopup(popupImg)
  linkInput.value = '';
  nameImgInput.value = '';
}

// слушальщики

openPopupButton.addEventListener('click', createPopupProfile);

buttonImg.addEventListener('click', openPopupImg);

popup.addEventListener('submit', saveInfo);

formImg.addEventListener('submit', addCards);
