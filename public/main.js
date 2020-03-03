import {createLogin} from './view/createLogin.js';
import {createRegistration} from './view/createRegistration.js';
import {createMainPage} from './view/createMainPage.js';
import {createProfile} from './view/createProfile.js';
import {FetchRequests} from './modules/fetchRequests.js';
import {default as CurrentUser} from './utils/userDataSingl.js'; // не засоряем глобальную область


const application = document.getElementById('application');

/**
 *  gat user bo cookie and show "download" before page show
 *
 * @param {function} createFunction - function that can create page
 * @return {void}
 */
function getUserDataByCookieBeforeCreate(createFunction = createLogin) {
  console.log('GET BU COOKIE', createFunction);
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
      getUserDataByCookieBeforeCreate(createMainPage);
      break;
    }
    case '/': {
      getUserDataByCookieBeforeCreate(createMainPage);
      break;
    }
    case '/index.html': {
      getUserDataByCookieBeforeCreate(createMainPage);
      break;
    }
    case '/registration.html': {
      if ( CurrentUser.Data.login !== ''|| CurrentUser.Data.login != null) {
        getUserDataByCookieBeforeCreate(createMainPage);
        break;
      }
      createRegistration();
      break;
    }
    case '/login.html': {
      console.log('GO TO LOGIN SWITCH');
      if ( CurrentUser.Data.login !== 'null') {
        getUserDataByCookieBeforeCreate(createMainPage);
        console.log('BAD BAD BAD');
        break;
      }

      createLogin();
      return;
    }
    case '/profile.html': {
      console.log('profile call!');
      getUserDataByCookieBeforeCreate(createProfile);
      break;
    }
    default: {
      getUserDataByCookieBeforeCreate(createMainPage);
    }
        // @todo add one task page
  }
}


showPage();
