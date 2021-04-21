const openPopupButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup_is-opened');
const closePopupButton = document.querySelector('.popup__close')

function togglePopup(event) {
  popup.classList.toggle('popup_is-opened');
};

openPopupButton.addEventListener('click', togglePopup);

closePopupButton.addEventListener('click', togglePopup)

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
})