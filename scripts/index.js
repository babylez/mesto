
const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__fullname');
const profilejob = document.querySelector('.profile__job');

const nameInput = document.querySelector('.popup__info_type_full-name');
const jobInput = document.querySelector('.popup__info_type_job');

const form = document.querySelector('.popup')



function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
}


function closePopup() {
  popup.classList.remove('popup_opened');
}



function saveInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup();
}

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

form.addEventListener('submit', saveInfo);

//кнопка плюс кнопка закрыть
const buttonImg = document.querySelector('.profile__button')

const popupImg = document.querySelector('.popup_content_img');
const closePopupButtonImg = document.querySelector('.popup__close_content_img');


function openPopupImg() {
  popupImg.classList.add('popup_opened');
}


function closePopupImg() {
  popupImg.classList.remove('popup_opened');
}

buttonImg.addEventListener('click', openPopupImg);

closePopupButtonImg.addEventListener('click', closePopupImg);

// Массив карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    id: 0
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    id: 1
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    id: 2
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    id: 3
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    id: 4
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    id: 5
  }
];

// картчоки Из массива
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const card = cardTemplate.querySelector('.element');

initialCards.forEach(({ name, link, id }) => {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = link;
  card.querySelector('.element__image').alt = name;
  card.querySelector('.element__title').textContent = name;
  card.id = id;

  elements.append(card);
});

//попап с картинкой 
const bigImg = document.querySelector('.popup-img');
const imgCaption = document.querySelector('.popup-img__caption');
const picture = document.querySelector('.popup-img__img');

function openPopupImage() {
  bigImg.classList.add('popup_opened');
  console.log(this);
  picture.src = this.src;
  picture.alt = this.value;
  imgCaption.textContent = this.value;
}

document.querySelectorAll('.element__image').forEach(el =>
  el.addEventListener('click', openPopupImage))

//лайк
function like() {
  this.classList.toggle('element__button_type_active')
}

document.querySelectorAll('.element__button').forEach(el =>
  el.addEventListener('click', like)
)

//удаление карточек

function deleteItem() {
  this.parentElement.remove();
}
document.querySelectorAll('.element__delet').forEach(el =>
  el.addEventListener('click', deleteItem)
)

//добавить карточку
const formImg = document.querySelector('.popup_content_img');

const linkInput = document.querySelector('.popup__info_type_link');

const nameImgInput = document.querySelector('.popup__info_type_name-img');

function add(event) {
  event.preventDefault();
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = linkInput.value;
  card.querySelector('.element__title').textContent = nameImgInput.value;
  card.querySelector('.element__delet').addEventListener('click', deleteItem);
  card.querySelector('.element__button').addEventListener('click', like);
  card.querySelector('.element__image').addEventListener('click', openPopupImage);
  elements.prepend(card);
  closePopupImg();
}
formImg.addEventListener('submit', add);


//закрытие попапа с изображением
const popupBigImg = document.querySelector('.popup-img');

document.querySelector('.popup__close-img').addEventListener('click', () => {
  popupBigImg.classList.remove('popup_opened')
})


