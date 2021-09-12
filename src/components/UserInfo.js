export class UserInfo {
  constructor(selectorUserName, selectorUserInfo) {
    this._userName = document.querySelector(selectorUserName);
    this._userInfo = document.querySelector(selectorUserInfo);
  }

  getUserInfo() {
    //return obj with date user
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfo(inputInfo, inputName) {
    //set new userinfo
    this._userInfo.textContent = inputInfo.value
    this._userName.textContent = inputName.value
  }

}