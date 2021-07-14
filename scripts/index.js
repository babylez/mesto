const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__info-error_active'
}

enableValidation(config);

const popupList = document.querySelectorAll('.popup');

const popup = document.querySelector('.popup-profile');

const openPopupButton = document.querySelector('.profile__edit');


const closePopupButtons = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector('.popup-profile');

const profileName = document.querySelector('.profile__fullname');
const profileJob = document.querySelector('.profile__job');

const nameInput = document.querySelector('.popup__info_type_full-name');
const jobInput = document.querySelector('.popup__info_type_job');

const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.element');

const imgCaption = document.querySelector('.popup-img__caption');
const picture = document.querySelector('.popup-img__img');
const popupBigImg = document.querySelector('.popup-img');

const buttonImg = document.querySelector('.profile__button')

const popupImg = document.querySelector('.popup_content_img');


const formImg = document.querySelector('.popup__form_content_img');
const linkInput = document.querySelector('.popup__info_type_link');
const nameImgInput = document.querySelector('.popup__info_type_name-img');

// Массив карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'

  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие всех попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEsc);
}
// закрытие попапов
function closePopup(Popup) {
  Popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEsc);
}

//закрытие по кнопке esc
function handleEsc(evt) {
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

// добавить картчоки из массива

function createCard({ link, name }) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector('.element__title').textContent = name;
  cardImage.addEventListener('click', () => openPopupImage(link, name));
  card.querySelector('.element__delet').addEventListener('click', deleteItem);
  card.querySelector('.element__button').addEventListener('click', likeCard);
  return card
}

initialCards.forEach(function (actualCard) {
  elements.append(createCard(actualCard))
})

//попап с картинкой 

function openPopupImage(link, name) {
  picture.src = link;
  picture.alt = name;
  imgCaption.textContent = name;
  openPopup(popupBigImg);
}

//лайк
function likeCard(event) {
  event.target.classList.toggle('element__button_type_active');
}

//удаление карточек

function deleteItem(evt) {
  evt.target.closest('.element').remove();
}

//кнопка плюс кнопка закрыть
function openPopupImg() {
  document.querySelector('.popup__save_content_img').disabled = true;
  openPopup(popupImg);
}

//создать карточку из попапа

function addCard() {
  return createCard({ link: linkInput.value, name: nameImgInput.value });
}

// добавить карточки
function addCards(event) {
  event.preventDefault();
  elements.prepend(addCard());
  closePopup(popupImg)
  linkInput.value = '';
  nameImgInput.value = '';
}

// слушальщики

openPopupButton.addEventListener('click', createPopupProfile);

buttonImg.addEventListener('click', openPopupImg);

popup.addEventListener('submit', saveInfo);

formImg.addEventListener('submit', addCards);
