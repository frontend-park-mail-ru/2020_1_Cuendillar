import {showHeaderAndSideBar} from './createMainPage.js';
import {setLocation} from './setLocate.js';
import {FetchRequests} from '../modules/fetchRequests.js';
import {default as CurrentUser} from '../modules/userDataSingl.js';
import {getRandomAvatarPath} from '../utils/randomPath.js';
import {ErrMsg} from '../components/errorMsg/errMsg.js';

/**
 *  check profile form
 *
 * @param {string} email - email
 * @param {string} password - password
 * @param {string} passwordRep - passwordRep
 * @return {void}
 */
function checkProfileForm(email, password, passwordRep) {
  const minPasswordLength = 4;

  if (password.length ===0 && passwordRep.length === 0) {
    return true;
  }
  if (password.length < minPasswordLength) {
    const err = new ErrMsg('Пароль должен содержать хотя бы 4 символа.', 'profile_error_msg');
    err.render();
    return false;
  }
  if (password !== passwordRep) {
    const err = new ErrMsg('Пароли должны совпадать.', 'profile_error_msg');
    err.render();
    return false;
  }
  // toDo add check string password
  return true;
}

/**
 *  create profile page
 *
 * @param {boolean} repaintHeader - do we need repaint?
 * @return {void}
 */
export function createProfile(repaintHeader = false) {
  setLocation('/profile', 'Profile');

  if (repaintHeader) {
    showHeaderAndSideBar();
  }

  const avatarPath = getRandomAvatarPath();

  const mainContent = document.getElementsByClassName('main_content')[0];
  mainContent.innerHTML = `
    <form   id = "profileForm" class="profile_form">
            <header>
                <h2>Настройки профиля</h2>
                <div id = "profile_error_msg"></div>
                
            </header>
            <main>
                <h3> Login:${CurrentUser.Data.login}</h3>
                <input id="profilePass" name="ProfPass" value="" type="password"  placeholder="Сменить пароль">
                <input id="profilePassRep" name="repProfPass" value="" type="password"
                 placeholder="Повторите новый пароль">
                <input id="profileEmail" type="email" value="${CurrentUser.Data.email}" placeholder="email">
            </main>
            <footer>
                <button type="submit">Сохранить</button>
            </footer>
            
            <input  id="profileTextToken" hidden = true name="token" value="${CurrentUser.Data.token}">
            
        </form>
        
        <form id = "profileFormAvatar" class="profile_form" enctype="multipart/form-data">
        <header>
               <h2>Изменение аватара</h2>
               <div id = "profile_error_msg_avatar"></div>
            </header>
              <img class="profile_avatar" src="${avatarPath}">
            
              <div>
              <input type="file" name="avatar" type="submit">
        
        </div>
        
         <input hidden = true name="token" value="${CurrentUser.Data.token}">
        
</form>
`;
  const profileForm = document.getElementById('profileForm');
  const profilePassword = document.getElementById('profilePass');
  const profilePasswordRep = document.getElementById('profilePassRep');
  const profileEmail = document.getElementById('profileEmail');

  const profileTextToken = document.getElementById('profileTextToken');

  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const password = profilePassword.value.trim();
    const passwordRep = profilePasswordRep.value.trim();
    const email = profileEmail.value.trim();
    const textToken = profileTextToken.value.trim();

    if (!checkProfileForm(email, password, passwordRep)) {
      return;
    }

    const fromForm = {};
    fromForm.password = password;
    fromForm.email = email;
    fromForm.token = textToken;
    FetchRequests.changeProfile(fromForm);
  });

  const profileFormAvatar = document.getElementById('profileFormAvatar');
  profileFormAvatar.addEventListener('change', function(e) {
    e.preventDefault();
    const avatar = new FormData(profileFormAvatar);

    FetchRequests.sendUserAvatar(avatar);
  });
}
