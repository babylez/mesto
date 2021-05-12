
const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');

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
const closePopupButtonImg = document.querySelector('.popup__close_content_img');


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

// Открытие закрытие всех попапов

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

closePopupButtons.forEach(el => el.addEventListener('click', function closePopup() {
  el.closest('.popup').classList.remove('popup_opened')
}))


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
  popupProfile.classList.remove('popup_opened');
}


// картчоки Из массива

function createCard({ link, name }) {
  const cards = cardTemplate.querySelector('.element').cloneNode(true);
  cards.querySelector('.element__image').src = link;
  cards.querySelector('.element__image').alt = name;
  cards.querySelector('.element__title').textContent = name;
  cards.querySelector('.element__image').addEventListener('click', openPopupImage);
  cards.querySelector('.element__delet').addEventListener('click', deleteItem);
  cards.querySelector('.element__button').addEventListener('click', likeCard);
  return cards
}

initialCards.forEach(function (actualCard) {
  elements.append(createCard(actualCard))
})

//попап с картинкой 

function openPopupImage(event) {
  openPopup(popupBigImg);
  picture.src = event.target.src;
  picture.alt = event.target.alt;
  imgCaption.textContent = event.target.alt
}


//лайк
function likeCard(event) {
  event.target.classList.toggle('element__button_type_active')
}

//удаление карточек

function deleteItem(evt) {
  evt.target.closest('.element').remove();
}

//кнопка плюс кнопка закрыть

function openPopupImg() {
  openPopup(popupImg);
}

//добавить карточку

function addCard() {
  createCard;
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = linkInput.value;
  card.querySelector('.element__title').textContent = nameImgInput.value;
  card.querySelector('.element__image').alt = nameImgInput.value;
  /*card.querySelector('.element__delet').addEventListener('click', deleteItem);
  card.querySelector('.element__button').addEventListener('click', likeCard);
  card.querySelector('.element__image').addEventListener('click', openPopupImage);*/
  return card
}

function addCards(event) {
  event.preventDefault();
  elements.prepend(addCard());
  popupImg.classList.remove('popup_opened')
  linkInput.value = '';
  nameImgInput.value = '';
}

openPopupButton.addEventListener('click', createPopupProfile);


buttonImg.addEventListener('click', openPopupImg);

popup.addEventListener('submit', saveInfo);

formImg.addEventListener('submit', addCards);
