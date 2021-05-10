//попап профиль 
const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector('.popup-profile');

const profileName = document.querySelector('.profile__fullname');
const profileJob = document.querySelector('.profile__job');

const nameInput = document.querySelector('.popup__info_type_full-name');
const jobInput = document.querySelector('.popup__info_type_job');

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened')
}



function createPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function saveInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(event);
}

closePopupButton.forEach(el =>
  el.addEventListener('click', closePopup)
)

openPopupButton.addEventListener('click', createPopupProfile);

popup.addEventListener('submit', saveInfo);

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

// картчоки Из массива
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.element');

function createCard({ link, name }) {
  const cards = cardTemplate.querySelector('.element').cloneNode(true);
  cards.querySelector('.element__image').src = link;
  cards.querySelector('.element__image').alt = name;
  cards.querySelector('.element__title').textContent = name;
  return (cards)
}

initialCards.forEach(function (actualCard) {
  elements.append(createCard(actualCard))
})

//попап с картинкой 
const imgCaption = document.querySelector('.popup-img__caption');
const picture = document.querySelector('.popup-img__img');
const popupBigImg = document.querySelector('.popup-img')

function openPopupImage() {
  openPopup(popupBigImg);
  picture.src = this.src;
  picture.alt = this.alt;
  imgCaption.textContent = this.alt
}


document.querySelectorAll('.element__image').forEach(el =>
  el.addEventListener('click', openPopupImage))


//закрытие попапа с картинкой

document.querySelector('.popup__close-img').addEventListener('click', () => {
  popupBigImg.classList.remove('popup_opened')
})


//лайк
function likeCard(event) {
  event.target.classList.toggle('element__button_type_active')
}

document.querySelectorAll('.element__button').forEach(el =>
  el.addEventListener('click', likeCard)
)

//удаление карточек

function deleteItem(evt) {
  evt.target.closest('.element').remove();
}
document.querySelectorAll('.element__delet').forEach(el =>
  el.addEventListener('click', deleteItem)
)



//кнопка плюс кнопка закрыть
const buttonImg = document.querySelector('.profile__button')

const popupImg = document.querySelector('.popup_content_img');
const closePopupButtonImg = document.querySelector('.popup__close_content_img');


function openPopupImg() {
  openPopup(popupImg);
}


buttonImg.addEventListener('click', openPopupImg);

closePopupButtonImg.addEventListener('click', closePopup);

//добавить карточку

const formImg = document.querySelector('.popup__form_content_img')

const linkInput = document.querySelector('.popup__info_type_link');

const nameImgInput = document.querySelector('.popup__info_type_name-img');

function addCard() {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = linkInput.value;
  card.querySelector('.element__title').textContent = nameImgInput.value;
  card.querySelector('.element__image').alt = nameImgInput.value;
  card.querySelector('.element__delet').addEventListener('click', deleteItem);
  card.querySelector('.element__button').addEventListener('click', likeCard);
  card.querySelector('.element__image').addEventListener('click', openPopupImage);
  return (card)
}

function addCards(event) {
  event.preventDefault();
  elements.prepend(addCard());
  closePopup(event);
  linkInput.value = '';
  nameImgInput.value = '';
}


formImg.addEventListener('submit', addCards);
