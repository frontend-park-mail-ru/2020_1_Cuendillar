
console.log("start main js");

const application = document.getElementById('application');

globalThis.userData = {
    id: -1,
    login:"login",
    email: "email"
};



function setLocation(curLoc){
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch(e) {
        console.log("setLocation Err")
    }
    location.hash = '#' + curLoc;
}



function checkRegistrationForm(registrationLogin, registrationPassword, registrationPasswordRep, registrationEmail) {
    return registrationPassword === registrationPasswordRep;
    //@todo add check symbols in login, strong of password ...
}

function createRegistration() {
    setLocation("/registration.html");
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
                    createLogin();
                } else { // 400 возрвщает если пользователь уже есть
                    alert("Не удалось зарегистрироваться, пользователь с таким логином уже существует.");
                }
            }
        })
    });
}

function createLogin() {
    setLocation("/login.html");
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
                    const answer = JSON.parse(response);
                    globalThis.userData.id = answer.id;
                    globalThis.userData.login = answer.login;
                    globalThis.userData.email = answer.email;
                    console.log("set GLOBAL USER LOGIN:", globalThis.userData.login);
                    createMainPage()
                } else {
                    alert("Не удалось авторизоваться, неверная комбинация почта-пароль.");
                    createLogin()
                }
            }
        });
        application.innerHTML  =' Загрузка... ';
    });
}

function showHeaderAndSideBar() {
    application.innerHTML =`
    <header class="main_header">
    <h2 class="header_siteName">Cuendillar</h2>
    <div class="header_links">
        <a id="linkMainPage" class="header_one_link" href="index.html">Главная</a>
        <a id="profileMainLink" class="header_one_link" href="profile.html">Профиль</a>
        <a class="header_one_link" href="#">Что-то еще</a>
        <a class="header_one_link" href="#">И еще что-то</a>
         <a class="header_one_link" href="#">${globalThis.userData.login}</a>
        <a id="logoutLink" class="exit_link" href="#">Выйти</a>
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
    const logoutLink = document.getElementById("logoutLink");
    logoutLink.addEventListener("click", function(e) {
        e.preventDefault();

        globalThis.AjaxModule.ajaxPost({
            url: 'http://127.0.0.1:8080/logout', body: null, callback: (status, response) =>
            {
                if (status === 200) {
                    globalThis.userData.email = null;
                    globalThis.userData.login = null;
                    globalThis.userData.id = null;
                    createLogin();
                } else {
                    alert("logout err");
                    createLogin();
                }
            }
        })
    });

}

function createMainPage() {
    setLocation("/index.html");
    showHeaderAndSideBar();
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
<div class="container">
  <img class="avatarTask" src="assets/logoBadFront.png" alt="Avatar">
  <a id="task1" href="#">
  <p><span > task bubble sort O(n) .</span> </p> 
  </a>
  Gerald from Rivia.
  <p>Task little text Task little text Task little text.</p>
</div>
<div class="container">
  <img class="avatarTask" src="assets/logoBadFront.png" alt="Avatar">
  <a id="task2" href="#">
  <p><span > task bubble sort O(n) .</span> </p> 
  </a>
  Gerald from Rivia.
  <p>Task little text Task little text Task little text.</p>
</div>
<div class="container">
  <img class="avatarTask" src="assets/logoBadFront.png" alt="Avatar">
  <a id="task3" href="#">
  <p><span > task bubble sort O(n) .</span> </p> 
  </a>
  Gerald from Rivia.
  <p>Task little text Task little text Task little text.</p>
</div>
`;
    const task1 = document.getElementById("task1");
    task1.addEventListener("click", function(e) {
        e.preventDefault();
        createOneTask();
    });
    const task2 = document.getElementById("task2");
    task2.addEventListener("click", function(e) {
        e.preventDefault();
        createOneTask();
    });
    const task3 = document.getElementById("task3");
    task3.addEventListener("click", function(e) {
        e.preventDefault();
        createOneTask();
    });
}

function createProfile() {
    setLocation("/profile.html");
    showHeaderAndSideBar();
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
    <form class="profile_form">
            <header>
                <h2>Настройки профиля</h2>
            </header>
            <main>
                <h3> login:"${globalThis.userData.login}"</h3>
                <input name="ProfPass" value="" type="password"  placeholder="Сменить пароль">
                <input name="repProfPass" value="" type="password" placeholder="Повторите новый пароль">
                <input type="newemail" value="${globalThis.userData.email}" placeholder="email">
                <img class="profile_avatar" src="assets/logoBadFront.png">
                <input type="file" name="f">
            </main>
            <footer>
                <button disabled>Сохранить</button>
            </footer>
        </form>
`;
}

function createOneTask() {
    setLocation("/onetask.html");
    showHeaderAndSideBar();
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
    <div class="container">
  <img class="avatarTask" src="assets/logoBadFront.png" alt="Avatar">
  <p><span > task bubble sort O(n) .</span> Gerald from Rivia.</p>
  <p> Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
   Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
    Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
     Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
      Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
       Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of
        task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text
         of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long
          text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
           Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long
            text of task. </p>
  <h4> time by 21:00 00.00.00</h4>
</div>
`;
}

function getUserDataByCookie(createFunction = createLogin()) {

    var creatFunc = (status, response) =>
    {
        if (status === 200) {
            const answer = JSON.parse(response);
            if (answer.status === false)
                return false;
            globalThis.userData.id = answer.id;
            globalThis.userData.login = answer.login;
            globalThis.userData.email = answer.email;
            console.log("set GLOBAL USER LOGIN get user:", globalThis.userData.login);

            if (createFunction === undefined) { // почему undefined ? если перезагружаюсь с index.html
                showPage();
                console.log("show page:", window.location.pathname);
                return;
            }

            createFunction();
        } else {
            createLogin();
        }
    };

    globalThis.AjaxModule.ajaxPost({
        url: 'http://127.0.0.1:8080/getuser', body: null, callback: creatFunc });
    console.log("set dowload");
    application.innerHTML = "Загрузка...";
}

function showPage() {
    var url = window.location.pathname;
    console.log(url);
    switch (url) {
        //@todo  add regular expr
        case  "": {
            getUserDataByCookie(createMainPage());
            break;
        }
        case "/": {
            getUserDataByCookie(createMainPage());
            break;
        }
        case "/index.html": {
            console.log("reload index");
            getUserDataByCookie(createMainPage());
            break;
        }
        case "/registration.html": {
            createRegistration();
            break;
        }
        case "/login.html": {
            createLogin();
            break;
        }
        case "/profile.html": {
            getUserDataByCookie(createProfile());
            break;
        }
        case "/onetask.html": {
            getUserDataByCookie(createOneTask());
            break;
        }
        default:{
            getUserDataByCookie(createMainPage());
        }
        //@todo add one task page
    }
}


showPage();
