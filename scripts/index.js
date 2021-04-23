
let openPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup_opened');
let closePopupButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__fullname');
let profilejob = document.querySelector('.profile__job');

let nameInput = document.querySelector('.popup_type_full-name');
let jobInput = document.querySelector('.popup_type_job');

let popupButtonSave = document.querySelector('.popup__save');


function openPopup() {
  popup.classList.toggle('popup_opened');
  popup.classList.contains('.popup_opened');
};

function closePopup() {
  popup.classList.toggle('popup_opened');
  popup.classList.contains('.popup_opened');
};


function saveInfo(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup();
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup,);

popupButtonSave.addEventListener('click', saveInfo);