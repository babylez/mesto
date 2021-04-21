const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup_type_hidden');
const closePopupButton = document.querySelector('.popup__close')

function togglePopup(event) {
  popup.classList.toggle('popup_type_hidden');
};

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup)

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
})


let popupButtonSave = document.querySelector('.popup__save');
let profileName = document.querySelector('.profile__fullname');
let profilejob = document.querySelector('.profile__job');

function saveInfo() {
  togglePopup();
  let nameInput = document.querySelector('.popup__full-name').value;
  profileName.innerHTML = nameInput;

  let jobInput = document.querySelector('.popup__job').value;
  profilejob.innerHTML = jobInput;
}

popupButtonSave.addEventListener('click', saveInfo);
