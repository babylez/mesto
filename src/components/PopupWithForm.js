class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmit) {
    super(selectorPopup);
    this._callBackSubmit = callBackSubmit;

  }

  _getInputValues() {
    // collect data all forms
  }

  setEventListeners() {
    // add form submission handler
  }

  close() {
    //reset form
  }
}