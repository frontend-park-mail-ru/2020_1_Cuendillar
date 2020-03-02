import {createLogin} from './view/createLogin.js';
import {createRegistration} from './view/createRegistration.js';
import {createMainPage} from './view/createMainPage.js';
import {createProfile} from './view/createProfile.js';
import {createOneTask} from './view/createOneTask.js';
import {FetchRequests} from './modules/fetchRequests.js';
import {default as CurrentUser} from './utils/userDataSingl.js'; // не засоряем глобальную область


const application = document.getElementById('application');

/*
globalThis.userData = {
  id: -1,
  login: "",
  email: 'email',
  token: "",
  avatarPath: getRandomAvatarPath(),
};
*/

/**
 *  gat user bo cookie and show "download" before page show
 *
 * @param {function} createFunction - function that can create page
 * @return {void}
 */
function getUserDataByCookieBeforeCreate(createFunction = createLogin()) {
  FetchRequests.getUserByCookie(createFunction);
  application.innerHTML = 'Загрузка...';
}

/**
 *  router
 *
 * @return {void}
 */
function showPage() {
  const url = window.location.pathname;
  console.log(url);
  switch (url) {
    // @todo  add regular expr
    case '': {
      getUserDataByCookieBeforeCreate(createMainPage());
      break;
    }
    case '/': {
      getUserDataByCookieBeforeCreate(createMainPage());
      break;
    }
    case '/index.html': {
      getUserDataByCookieBeforeCreate(createMainPage());
      break;
    }
    case '/registration.html': {
      if ( CurrentUser.Data.login !== ''|| CurrentUser.Data.login != null) {
        getUserDataByCookieBeforeCreate(createMainPage());
      }
      createRegistration();
      break;
    }
    case '/login.html': {
      if ( CurrentUser.Data.login !== ''|| CurrentUser.Data.login != null) {
        getUserDataByCookieBeforeCreate(createMainPage());
      }
      createLogin();
      break;
    }
    case '/profile.html': {
      console.log('profile call!');
      getUserDataByCookieBeforeCreate(createProfile());
      break;
    }
    case '/onetask.html': {
      getUserDataByCookieBeforeCreate(createOneTask());
      break;
    }
    default: {
      getUserDataByCookieBeforeCreate(createMainPage());
    }
        // @todo add one task page
  }
}


showPage();
