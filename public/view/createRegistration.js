import {FetchModule} from "../modules/fetchCases.js"

export function createRegistration() {
    globalThis.CreatorModule.setLocation("/registration.html");
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

    const registrationForm = document.getElementById("registrationForm")
    const registrationLogin = document.getElementById('registrationLogin');
    const registrationPassword = document.getElementById('registrationPassword');
    const registrationPasswordRep = document.getElementById('registrationPasswordRep');
    const registrationEmail = document.getElementById('registrationEmail');
    const fromRegistrationToLogin = document.getElementById('fromRegistrationToLogin');

    fromRegistrationToLogin.addEventListener("click", function(e) {
        e.preventDefault();
        createLogin();
    });

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const login = registrationLogin.value.trim();
        const password = registrationPassword.value.trim();
        const passwordRep = registrationPasswordRep.value.trim();
        const email = registrationEmail.value.trim();

        if  (! globalThis.CreatorModule.checkRegistrationForm(login, password,
            passwordRep, email)) {
            alert("Пароли должны совпадать.");
            return;
        }
        console.log("try send:", login, password, email);

        var fromForm = new Object();
        fromForm.login = login;
        fromForm.password  = password;
        fromForm.email = email;
        console.log("CREATE!");
        FetchModule.RegistrationForm(fromForm)

    });
}