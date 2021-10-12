import './index.css';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api";
import { PopupWithProfile } from '../components/PopopWithProfile.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';

import {
  config,
  formProfile,
  formCard,
  openPopupProfileButton,
  nameInput,
  jobInput,
  buttonOpenPopupAddCard,
  formAvatar,
} from '../utils/constants.js';

const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();

//попап картинки
function handleCardClick(name, link) {
  imagePopup.open(name, link)
}

function handleCardDelete(el, card) {
  const popupWithDelete = new PopupWithDelete(".popup-chek-delete-card", () => {
    api.deleteCard(el).then(() => {
      card._deleteItem();
    })
      .catch(e => {
        console.log("Ошибка удаления карточки", e);
      })
  })
  popupWithDelete.setEventListeners();
  popupWithDelete.open();
}

const profileAvatar = document.querySelector('.profile__avatar')

const popupAvatar = new PopupWithProfile('.popup-profile-edit', () => {
  profileAvatar.src = document.querySelector('.popup__info_type_profile-edit').value
  const avatar = profileAvatar.src
  api.updateProfileAvatar(avatar)
})

popupAvatar.setEventListeners()

const butAva = document.querySelector('.profile__avatar-pencil')
butAva.addEventListener('click', () => {
  popupAvatar.open()


})

//validation
const validatorProfile = new FormValidator(config, formProfile)
const validatorCard = new FormValidator(config, formCard)
const validatorAvatar = new FormValidator(config, formAvatar)

validatorAvatar.enableValidation()
validatorCard.enableValidation();
validatorProfile.enableValidation();

const api = new Api('228ed6be-a1b3-4a10-bdf0-f4f2efa8229b', 'https://mesto.nomoreparties.co/v1/cohort-27');

api.getUserInfo().then(res => {
  userInfo.setUserInfo(res)
})


const section = new Section({
  items: [],
  renderer: (el) => {
    const element = getSampleCard(el);
    section.setItem(element)
  }
},
  '.elements'
)

api.getCards().then((res) => {
  res.forEach(el => {
    section.addItem(el);
  })
  section.renderItems();
})
section.renderItems();



//get card
function getSampleCard(el) {
  const card = new Card(
    el,
    '#card-template',
    '.element',
    () => { handleCardClick(el.name, el.link) },
    api
  );
  card.setDeleteHandler(() => { handleCardDelete(el, card) });


  return card.render()
}

// popup create card
const popupCard = new PopupWithForm('.popup_content_place', (inputValues) => {
  const text = inputValues['title-input'];
  const url = inputValues['link-input'];


  api.addCard(text, url).then(res => {
    const newCard = getSampleCard(res);
    section.setNewItem(newCard);
  })

}, '.form-card')
popupCard.setEventListeners()

//userinfo editing
const userInfo = new UserInfo('.profile__fullname', '.profile__job', 'profile__avatar',);


//create popup profile
const popupProfile = new PopupWithForm('.popup-profile', (inputValues) => {

  let name = inputValues['full-name-input']
  let about = inputValues['job-input']


  api.updateProfile({ name: name, about: about })
    .then(newData => {
      userInfo.setUserInfo(newData)
    })
    .catch(err => {
      console.log(`Ошибка ${err}`);
    })

})

popupProfile.setEventListeners();

//listeners popup
buttonOpenPopupAddCard.addEventListener('click', () => {
  popupCard.open();
  validatorCard.resetValidation()
})

//listeners popup
openPopupProfileButton.addEventListener('click', () => {
  popupProfile.open()
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name
  jobInput.value = userData.info
  validatorProfile.resetValidation()
})

