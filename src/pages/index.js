import './index.css';
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from "../components/Api";
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

const api = new Api('228ed6be-a1b3-4a10-bdf0-f4f2efa8229b', 'https://mesto.nomoreparties.co/v1/cohort-27');

const userInfo = new UserInfo('.profile__fullname', '.profile__job', '.profile__avatar',);

api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res)
  })
  .catch(err => {
    console.log(`Ошибка b ${err}`);
  })

const imagePopup = new PopupWithImage('.popup-img');
imagePopup.setEventListeners();

//попап картинки
function handleCardClick(name, link) {
  imagePopup.open(name, link)
}

const popupWithDelete = new PopupWithDelete(".popup-chek-delete-card")
popupWithDelete.setEventListeners();

function handleCardDelete(el, card) {
  const callback = () => {
    api.deleteCard(el).then(() => {
      card.deleteItem();
    })
      .then(() => {
        popupWithDelete.close()
      })
      .catch(e => {
        console.log("Ошибка удаления карточки", e);
      })
  }
  popupWithDelete.setCallBackSubmit(callback);
  popupWithDelete.open();
}

const buttonAvatar = document.querySelector('.profile__avatar-pencil')
buttonAvatar.addEventListener('click', () => {
  popupAvatar.open()

})

//validation
const validatorProfile = new FormValidator(config, formProfile)
const validatorCard = new FormValidator(config, formCard)
const validatorAvatar = new FormValidator(config, formAvatar)

validatorAvatar.enableValidation()
validatorCard.enableValidation();
validatorProfile.enableValidation();

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
  .catch(err => {
    console.log(`Ошибка ${err}`);
  })

//get card
function getSampleCard(el) {
  const card = new Card(
    el,
    '#card-template',
    '.element',
    () => { handleCardClick(el.name, el.link) },
    () => {
      api.changeLikeCardStatus(el, "DELETE")
        .then(() => {
          card.likeCard()
        })
    },
    () => { api.changeLikeCardStatus(el, "PUT") }
  );
  card.setDeleteHandler(() => { handleCardDelete(el, card) });
  return card.render()
}

// popup create card
const popupCard = new PopupWithForm('.popup_content_place', (inputValues) => {
  const text = inputValues['title-input'];
  const url = inputValues['link-input'];
  popupCard.setButtonText("Создание...");
  api.addCard(text, url).then(res => {
    const newCard = getSampleCard(res);
    section.setNewItem(newCard);
  }).then(() => {
    popupCard.close()
  })
    .catch(() => {
      popupCard.setButtonText("Ошибка");;
    })
    .finally(() => { popupCard.setButtonText("Создать") })

}, '.form-card')
popupCard.setEventListeners()
//userinfo editing


//create popup profile
const popupProfile = new PopupWithForm('.popup-profile', (inputValues) => {
  const name = inputValues['full-name-input']
  const about = inputValues['job-input']
  popupProfile.setButtonText("Сохранение...");
  api.updateProfile({ name: name, about: about })
    .then(newData => {
      userInfo.setUserInfo(newData)
    })
    .then(() => {
      popupProfile.close()
    })
    .catch(() => {
      popupProfile.setButtonText("Ошибка");
    })
    .finally(() => {
      popupProfile.setButtonText("Сохранить")
    })
})

popupProfile.setEventListeners();
/*я извяюсь, что опять сам не смог исправить и пишу с вопросом, 
но тут же по аналогии с попапами профиля и создания карточки,
  но там все работает, а тут почему то не отображается аватар,
    хотя на сервер приходит, и в src тега автара тоже записывается ссылка,
      через консоль смотрел, все в норме, а на странице картинка почему то не отображается */
//И спасибо за скорость проверки, это мое самое быстрое ревью было)
const popupAvatar = new PopupWithForm('.popup-profile-edit', (inputValues) => {
  const avatar = inputValues['avatar-title-input']
  popupAvatar.setButtonText("Сохранение...");
  api.updateProfileAvatar({ avatar: avatar })
    .then(data => {
      userInfo.setUserInfo(data)

    })
    .then(() => {
      // document.querySelector('.profile__avatar').src = data.avatar
      console.log(avatar);
      console.log(document.querySelector(".profile__avatar"))
      popupAvatar.close()

    })
    .catch(() => {
      popupAvatar.setButtonText("Ошибка");
    })
    .finally(() => popupAvatar.setButtonText("Сохранить"))

})
popupAvatar.setEventListeners()

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

console.log(document.querySelector(".profile__avatar"))


console.log(api.getUserInfo())