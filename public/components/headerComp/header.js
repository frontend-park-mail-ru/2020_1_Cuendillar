import {default as CurrentUser} from '../../modules/userDataSingl.js';

/**
 *  component header
 *
 */
export class HeaderComp {
  /**
   *  constructor header
   *
   *  @param {string} idApp - id for search in document
   */
  constructor(idApp = 'application' ) {
    this.idApp = document.getElementById(idApp);
    this.login = CurrentUser.Data.login;
    this.avatarPath = CurrentUser.Data.avatarPath;
  }

  /**
   *  render header
   *
   * @return {void}
   */
  render() {
    this.idApp.innerHTML =`

    <header class="main_header">
   
    <div class="header_links">
     <h2 class="header_siteName">Cuendillar</h2>
        <a id="linkMainPage" class="header_one_link" href="index.html">Главная</a>
        <a id="profileMainLink" class="header_one_link" href="profile.html">Профиль</a>
        <a class="header_one_link" href="#">Что-то еще</a>
        <a class="header_one_link" href="#">И еще что-то</a>
    </div>
    
    <div class="header_profile_info">
             <div class="login_in_header" href="#">${this.login}</div>
            <img class="avatar_header" src="${this.avatarPath}">
        <a id="logoutLink" class="exit_link" href="#">Выйти</a>
    </div>
    
</header>
    `;
  }
}
