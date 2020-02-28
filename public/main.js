// echo
// rest
// handle gorila

import {createLogin} from "./view/createlogin.js"
import  {createRegistration} from "./view/createRegistration.js"
import  {createMainPage} from "./view/createMainPage.js"
import  {createProfile} from "./view/createProfile.js"
import  {createOneTask} from "./view/createOneTask.js"
import {FetchRequests} from "./modules/fetchRequests.js"


const application = document.getElementById('application');


globalThis.userData = {
    id: -1,
    login:"login",
    email: "email"
};

function getUserDataByCookieBeforeCreate(createFunction = createLogin()) {
    FetchRequests.GetUserByCookie(createFunction);
    application.innerHTML = "Загрузка...";
}

function showPage() {
    var url = window.location.pathname;
    console.log(url);
    switch (url) {
        //@todo  add regular expr
        case  "": {
            getUserDataByCookieBeforeCreate(createMainPage());
            break;
        }
        case "/": {
            getUserDataByCookieBeforeCreate(createMainPage());
            break;
        }
        case "/index.html": {
            console.log("reload index");
            getUserDataByCookieBeforeCreate(createMainPage());
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
            getUserDataByCookieBeforeCreate(createProfile());
            break;
        }
        case "/onetask.html": {
            getUserDataByCookieBeforeCreate(createOneTask());
            break;
        }
        default:{
            getUserDataByCookieBeforeCreate(createMainPage());
        }
        //@todo add one task page
    }
}


showPage();
