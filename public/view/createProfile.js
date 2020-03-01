import {showHeaderAndSideBar, createMainPage} from './createMainPage.js';
import {setLocation} from './setLocate.js';
import {FetchRequests} from '../modules/fetchRequests.js';
import {serverLocate} from '../utils/constants.js';

/**
 *  get random url for download avatar
 *
 * @param {int} randomPartLength - length of randomPart
 * @return {string}
 */
export function getRandomAvatarPath(randomPartLength = 20) {
  let random = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < randomPartLength; i++ ) {
    random += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return serverLocate + '/getAvatar' + globalThis.userData.login + random;
}

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
  // not change pass
  if (password.length ===0 && passwordRep.length === 0) {
    return true;
  }
  if (password.length < minPasswordLength) {
    alert('Пароль должен содержать хотя бы 4 символа.');
    return false;
  }
  if (password !== passwordRep) {
    alert('Пароли должны совпадать.');
    return false;
  }
  // toDo add check string password
  return true;
}

/**
 *  create profile page
 *
 * @return {void}
 */
export function createProfile() {
  setLocation('/profile.html', 'Profile');
  showHeaderAndSideBar();
  const avatarPath = getRandomAvatarPath();
  console.log('MY RANDOM PARH:', avatarPath);
  const mainContent = document.getElementsByClassName('main_content')[0];
  mainContent.innerHTML = `
    <form   id = "profileForm" class="profile_form">
            <header>
                <h2>Настройки профиля</h2>
            </header>
            <main>
                <h3> Login:${globalThis.userData.login}</h3>
                <input id="profilePass" name="ProfPass" value="" type="password"  placeholder="Сменить пароль">
                <input id="profilePassRep" name="repProfPass" value="" type="password"
                 placeholder="Повторите новый пароль">
                <input id="profileEmail" type="email" value="${globalThis.userData.email}" placeholder="email">
            </main>
            <footer>
                <button type="submit">Сохранить</button>
            </footer>
        </form>
        
        <form id = "profileFormAvatar" class="profile_form" enctype="multipart/form-data">
        <header>
               <h2>Изменение аватара</h2>
            </header>
              <img class="profile_avatar" src="${avatarPath}">
            
              <div>
              <input type="file" name="avatar">
         <button  type="submit">Сохранить аватар</button>
        </div>
</form>
`;
  const profileForm = document.getElementById('profileForm');
  const profilePassword = document.getElementById('profilePass');
  const profilePasswordRep = document.getElementById('profilePassRep');
  const profileEmail = document.getElementById('profileEmail');

  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const password = profilePassword.value.trim();
    const passwordRep = profilePasswordRep.value.trim();
    const email = profileEmail.value.trim();

    if (!checkProfileForm(email, password, passwordRep)) {
      return;
    }

    console.log('profile: try send:', password, email);

    const fromForm = {};
    fromForm.password = password;
    fromForm.email = email;

    FetchRequests.changeProfile(fromForm);

    createMainPage();
  });

  const profileFormAvatar = document.getElementById('profileFormAvatar');
  profileFormAvatar.addEventListener('submit', function(e) {
    e.preventDefault();

    const avatar = new FormData(profileFormAvatar);

    FetchRequests.sendUserAvatar(avatar);
    createMainPage();
  });
}
