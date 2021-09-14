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

  setUserInfo(item) {
    //set new userinfo 
    if (item.name) {
      this._userName.textContent = item.name;
    }
    if (item.info) {
      this._userInfo.textContent = item.info
    }
  }
}