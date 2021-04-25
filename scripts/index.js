
let openPopupButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__fullname');
let profilejob = document.querySelector('.profile__job');

let nameInput = document.querySelector('.popup__info_type_full-name');
let jobInput = document.querySelector('.popup__info_type_job');

let form = document.querySelector('.popup')



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