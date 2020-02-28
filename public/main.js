// echo
// rest
/// handle gorila

console.log("start main js");

const application = document.getElementById('application');

globalThis.userData = {
    id: -1,
    login:"login",
    email: "email"
};


function getUserDataByCookieBeforeCreate(createFunction = globalThis.CreatorModule.createLogin()) {

    globalThis.FetchModule.GetUserByCookie(createFunction);

    application.innerHTML = "Загрузка...";
}

function showPage() {
    var url = window.location.pathname;
    console.log(url);
    switch (url) {
        //@todo  add regular expr
        case  "": {
            getUserDataByCookieBeforeCreate(globalThis.CreatorModule.createMainPage());
            break;
        }
        case "/": {
            getUserDataByCookieBeforeCreate(globalThis.CreatorModule.createMainPage());
            break;
        }
        case "/index.html": {
            console.log("reload index");
            getUserDataByCookieBeforeCreate(globalThis.CreatorModule.createMainPage());
            break;
        }
        case "/registration.html": {
            globalThis.CreatorModule.createRegistration();
            break;
        }
        case "/login.html": {
            globalThis.CreatorModule.createLogin();
            break;
        }
        case "/profile.html": {
            getUserDataByCookieBeforeCreate(globalThis.CreatorModule.createProfile());
            break;
        }
        case "/onetask.html": {
            getUserDataByCookieBeforeCreate(globalThis.CreatorModule.createOneTask());
            break;
        }
        default:{
            getUserDataByCookieBeforeCreate(globalThis.CreatorModule.createMainPage());
        }
        //@todo add one task page
    }
}


showPage();
