export class UserInfo {

  constructor(selectorUserName, selectorUserInfo, selectorUserAvatar) {
    this._userName = document.querySelector(selectorUserName);
    this._userInfo = document.querySelector(selectorUserInfo);
    this._userAvatar = document.querySelector(selectorUserAvatar)
  }

  getUserInfo() {
    //return obj with date user 
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
      avatar: this._userAvatar.src,
      id: this._userId,
    }
  }

  setUserInfo(item) {
    //set new userinfo 
    if (item.name) {
      this._userName.textContent = item.name;
    }
    if (item.about) {
      this._userInfo.textContent = item.about
    }
    if (item._id) {
      window.userId = item._id;
    }
    if (item.avatar) {
      this._userAvatar = item.avatar
    }
  }
}