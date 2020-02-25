
console.log("start main js");

const application = document.getElementById('application');

function checkRegistrationForm(registrationLogin, registrationPassword, registrationPasswordRep, registrationEmail) {
    if (registrationPassword !== registrationPasswordRep) {
        return false
    }
    return true;
    //@todo add check symbols in login, strong of passwod ...
}

function createRegistration() {

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

        if  (!checkRegistrationForm(login, password,
            passwordRep, email)) {
            alert("Пароли должны совпадать.");
            return;
        }

        console.log("try send:", login, password, email);

        var fromForm = new Object();
        fromForm.login = login;
        fromForm.password  = password;
        fromForm.email = email;

        globalThis.AjaxModule.ajaxPost({
            url: 'http://127.0.0.1:8080/registration', body: fromForm, callback: (status, response) =>
            {
                if (status === 200) {
                    console.log("create profile! id:" + JSON.parse(response)["id"].toString(),
                        "\t Hello,", JSON.parse(response)["login"]);
                    //@todo redirect to mainPage
                } else { // 500 возрвщает если пользователь уже есть
                    alert("Не удалось зарегистрироваться, пользователь с таким логином уже существует.");
                }
            }
        })
    });
}

function createLogin() {
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
            <input id="loginEmail" type="email" placeholder="Логин">
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

        globalThis.AjaxModule.ajaxPost({
            url: 'http://127.0.0.1:8080/signin', body: fromForm, callback: (status, response) =>
            {
                if (status === 200) {
                    console.log("sign in! id:" + JSON.parse(response)["id"].toString(),
                        "\t Hello,", JSON.parse(response)["login"]);
                    //@todo redirect to mainPage
                } else { // 500 возрвщает если пользователь уже есть
                    alert("Не удалось авторизоваться, неверная комбинация почта-пароль.");
                }
            }
        })
    });
}

function showHeaderAndSideBar() {
    application.innerHTML =`
    <header class="main_header">
    <h2 class="header_siteName">Cuendillar(шрифты еще не выбрал)</h2>
    <div class="header_links">
        <a id="linkMainPage" class="header_one_link" href="index.html">Главная</a>
        <a id="profileMainLink" class="header_one_link" href="profile.html">Профиль</a>
        <a class="header_one_link" href="#">Что-то еще</a>
        <a class="header_one_link" href="#">И еще что-то</a>
        <a class="exit_link" href="signin.html">Выйти</a>
    </div>
</header>
<div class="main_content_and_side_bar">
    <div class="main_content">
    основной контент страницы
    </div>
    <aside class="side_bar">
        <div class="leaders_table">
            <h2> Лидеры </h2>
            <h4> 1 место логин</h4>
            <h4> 2 место логин</h4>
            <h4> 3 место логин</h4>
            <h4> 4 место логин</h4>
            <h4> 5 место логин</h4>
        </div>
        <div>
            Может быть какие-то новости
        </div>
    </aside>
    `;

    const linkMainPage = document.getElementById("linkMainPage");
    linkMainPage.addEventListener("click", function(e) {
        e.preventDefault();
        createMainPage();
    });
    const profileMainLink = document.getElementById("profileMainLink");
    profileMainLink.addEventListener("click", function(e) {
        e.preventDefault();
        createProfile();
    });
    //@todo add link logout

}

function createMainPage() {
    showHeaderAndSideBar();
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
    <h1> основной контент</h1>`;
    //@todo add html
}

function createProfile() {
    showHeaderAndSideBar();
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
    <form class="profile_form">
            <header>
                <h2>Настройки профиля</h2>
            </header>
            <main>
                <input type="text" placeholder="Логин с сервака">
                <input type="password" placeholder="Сменить пароль">
                <input type="password" placeholder="Повторите новый пароль">
                <input type="email" placeholder="Email с сервака">
                <img class="profile_avatar" src="assets/logoBadFront.png">
                <input type="file" name="f">
            </main>
            <footer>
                <button disabled>Сохранить</button>
            </footer>
        </form>
`;
}

function showPage() {
    var url = document.URL;
    console.log(url);
    switch (url) {  //@todo если нет сессии -> редирект на логин
        //@todo  add regular expr
        case "http://localhost:3000/": {
            createMainPage();
            break;
        }
        case "http://localhost:3000/index.html": {
            createMainPage();
            break;
        }
        case "http://localhost:3000/registration.html": {
            createRegistration();
            break;
        }
        case "http://localhost:3000/login.html": {
            createLogin();
            break;
        }
        case "http://localhost:3000/profile.html": {
            createProfile();
            break;
        }
        //@todo add one task page
    }
}


showPage();
