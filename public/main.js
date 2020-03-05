import {createLogin} from './view/createLogin.js';
import {createRegistration} from './view/createRegistration.js';
import {createMainPage} from './view/createMainPage.js';
import {createProfile} from './view/createProfile.js';
import {FetchRequests} from './modules/fetchRequests.js';
import {default as CurrentUser} from './modules/userDataSingl.js';


const application = document.getElementById('application');

/**
 *  gat user bo cookie and show "download" before page show
 *
 * @param {function} createFunction - function that can create page
 * @return {void}
 */
function getUserDataByCookieBeforeCreate(createFunction = createLogin) {
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
      if ( CurrentUser.Data.login === 'null') {
        createLogin();
        return;
      }
      getUserDataByCookieBeforeCreate(createMainPage);
      return;
    }
    case '/profile.html': {
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
