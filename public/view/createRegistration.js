import {setLocation} from './setLocate.js';
import {createLogin} from './createLogin.js';
import {FetchRequests} from '../modules/fetchRequests.js';

/**
 *  check registration form
 *
 * @param {string} registrationLogin - registrationLogin
 * @param {string} registrationPassword - registrationPassword
 * @param {string} registrationPasswordRep - registrationPasswordRep
 * @param {string} registrationEmail - registrationEmail
 * @return {boolean}
 */
function checkRegistrationForm(registrationLogin, registrationPassword,
    registrationPasswordRep, registrationEmail) {
  const minPasswordLength = 4;
  if ((registrationPassword.length) < minPasswordLength) {
    alert('Пароль должен содержать хотя бы 4 символа.');
    return false;
  }
  if (registrationPassword !== registrationPasswordRep) {
    alert('Пароли должны совпадать.');
    return false;
  }
  if (registrationLogin.length <= 4) {
    alert('Минимальная длина логина 5 символов.');
    return false;
  }
  if (registrationLogin === 'null') {
    alert('login must != null');
    return false;
  }

  // @todo add check strong pass and registrationEmail
  return true;
}

/**
 *  create registration page
 *
 * @return {void}
 */
export function createRegistration() {
  setLocation('/registration.html', 'Registration');
  application.innerHTML = `<div class="page">
    <header>
        <img class="littleLogo" src="assets/logoBadFront.png" alt="">
    </header>

    <form id="registrationForm" class="registration_form form_regist_signin">
        <header>
            <h2>Регистрация</h2>
        </header>

        <main>
            <input  id="registrationLogin" name="login" type="text" placeholder="Логин">
            <input id="registrationPassword" name="password" type="password" placeholder="Пароль">
            <input id="registrationPasswordRep" type="password" placeholder="Повторите пароль">
            <input id="registrationEmail" name="email" type="email" placeholder="Email">
        </main>

        <footer>
            <button type="submit">Зарегистрироваться</button>
            <a id="fromRegistrationToLogin"class="registration_link" href="signin.html">Уже есть аккаунт?</a>
        </footer>
    </form>
    <footer class="footerInfo">
        <a href="https://github.com/frontend-park-mail-ru/2020_1_Cuendillar">
            <h3>GitHub</h3>
        </a>
    </footer>
    `;

  const registrationForm = document.getElementById('registrationForm');
  const registrationLogin = document.getElementById('registrationLogin');
  const registrationPassword = document.getElementById('registrationPassword');
  const registrationPasswordRep = document.getElementById('registrationPasswordRep');
  const registrationEmail = document.getElementById('registrationEmail');
  const fromRegistrationToLogin = document.getElementById('fromRegistrationToLogin');

  fromRegistrationToLogin.addEventListener('click', function(e) {
    e.preventDefault();
    createLogin();
  });

  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const login = registrationLogin.value.trim();
    const password = registrationPassword.value.trim();
    const passwordRep = registrationPasswordRep.value.trim();
    const email = registrationEmail.value.trim();

    if (!checkRegistrationForm(login, password, passwordRep, email)) {
      return;
    }

    console.log('try send:', login, password, email);

    const fromForm = {};
    fromForm.login = login;
    fromForm.password = password;
    fromForm.email = email;
    FetchRequests.registrationForm(fromForm);
  });
}
