import {createRegistration} from "./createRegistration.js"
import {setLocation} from "./setLocate.js"
import {FetchRequests} from "../modules/fetchRequests.js"

export function createLogin() {
    console.log("CREATE LOGIN!");
    setLocation("/login.html", "Login");
    application.innerHTML =`
<div class="page">
    <header>
        <img class="mainLogo" src="assets/logoBadFront.png" alt="">
    </header>
    <form  id="loginForm" class="wrapper__form form_regist_signin">
        <header>
            <h2>Авторизация</h2>
        </header>
        <main>
            <input id="loginEmail" type="email" placeholder="Почта">
            <input id="loginPassword" type="password" placeholder="Пароль">
        </main>
        <footer>
            <button type="submit">Войти</button>
            <a class="secondary" href="#">Забыли пароль?</a>
            <a id="fromLoginToRegistrationLink" class="registration_link" href="registration.html">
                Создать аккаунт
            </a>

        </footer>
    </form>
    <footer class="footerInfo">
        <a href="https://github.com/frontend-park-mail-ru/2020_1_Cuendillar">
            <h3>GitHub</h3>
        </a>
    </footer>
    </div>
`;
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById('loginPassword');
    const fromLoginToRegistrationLink = document.getElementById('fromLoginToRegistrationLink');

    fromLoginToRegistrationLink.addEventListener("click", function(e) {
        e.preventDefault();
        createRegistration();
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        console.log("try send:", email, password);

        var fromForm = new Object();
        fromForm.email = email;
        fromForm.password  = password;

        FetchRequests.SignInForm(fromForm);

        application.innerHTML  =' Загрузка... ';
    });
}

