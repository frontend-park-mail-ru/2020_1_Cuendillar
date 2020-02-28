import {FetchModule} from "./fetchLogic.js"
import {serverLocate} from "../utils/constants.js";
import {createLogin} from "../view/createlogin.js";
import {createMainPage} from "../view/createMainPage.js";

export class FetchRequests {

    static RegistrationForm(fromForm) {
        FetchModule.fetchRequest( {url:serverLocate + "/registration", body: fromForm})
        .then(res => res.ok ? res : Promise.reject(res))
            .then( response => createLogin() )
            .catch(function (error) {
                alert("Не удалось зарегистрироваться, пользователь с таким логином уже существует.");
            });
    }

    static SignInForm(fromForm) {
        FetchModule.fetchRequest({url: serverLocate + "/signin", body: fromForm})
            .then(res => res.ok ? res : Promise.reject(res))
            .then(response =>
                response.json()
            )
            .then(result => {
                globalThis.userData.id = result.id;
                globalThis.userData.login = result.login;
                globalThis.userData.email = result.email;
                console.log("set GLOBAL USER LOGIN:", globalThis.userData.login);
                createMainPage();
            })
            .catch(function (error) {
                console.log("some signIN err");
                alert("Не удалось авторизоваться, неверная комбинация почта-пароль.");
                createLogin();
            });
    }

    static LogOut() {
        FetchModule.fetchRequest( {url:serverLocate + "/logout"})
            .then(res => res.ok ? res : Promise.reject(res))
            .then( response =>
                {
                    globalThis.userData.email = null;
                    globalThis.userData.login = null;
                    globalThis.userData.id = null;
                    createLogin();
                }
            )
            .catch(function (error) {
                alert("logout err");
                createLogin();
            });
    }

    static ChangeProfile(fromForm) {
        FetchModule.fetchRequest( {url:serverLocate + "/changeprofile", body:fromForm})
            .then(res => res.ok ? res : Promise.reject(res))
            .then( response =>
                response.json()
            )
            .then( result => {
                globalThis.userData.id = result.id;
                globalThis.userData.login = result.login;
                globalThis.userData.email = result.email;
                console.log("set GLOBAL USER LOGIN:", globalThis.userData.login);
                createMainPage();
            })
            .catch(function (error) {
                alert("Не удалось изменить профиль.");
            });
    }

    static  GetUserByCookie(createFunction) {
        FetchModule.fetchRequest( {url:serverLocate + "/getuser"})
            .then(res => res.ok ? res : Promise.reject(res))
            .then( response =>
                response.json()
            )
            .then( result => {
                globalThis.userData.id = result.id;
                globalThis.userData.login = result.login;
                globalThis.userData.email = result.email;
                if (createFunction === undefined) { // почему undefined ? если перезагружаюсь с index.html
                    console.log("err: why show page:", window.location.pathname);
                    createMainPage();
                    return;
                }
                createFunction();
            })
            .catch(function (error) {
                createLogin();
            });
    }
    
}