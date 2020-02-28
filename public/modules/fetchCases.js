import {createLogin} from "../view/createlogin.js"
import {createMainPage} from "../view/createMainPage.js"

class FetchModuleCl {

         RegistrationForm(fromForm) {

            fetch("http://127.0.0.1:8080/registration", {
                method: 'post',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(fromForm)
            })
                .then(res => res.ok ? res : Promise.reject(res))
                .then( response => createLogin() )
                .catch(function (error) {
                    alert("Не удалось зарегистрироваться, пользователь с таким логином уже существует.");
                });
        }


        SignInForm(fromForm){

            fetch("http://127.0.0.1:8080/signin", {
                method: 'post',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(fromForm)
            })
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
                    console.log("some signIN err");
                    alert("Не удалось авторизоваться, неверная комбинация почта-пароль.");
                   createLogin();
                });
        }

        LogOut(){
            fetch("http://127.0.0.1:8080/logout", {
                method: 'post',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: null
            })
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


        ChangeProfile(fromForm) {
            fetch("http://127.0.0.1:8080/changeprofile", {
                method: 'post',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(fromForm)
            })
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

        GetUserByCookie(createFunction){
            fetch("http://127.0.0.1:8080/getuser", {
                method: 'post',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: null
            })
                .then(res => res.ok ? res : Promise.reject(res))
                .then( response =>
                    response.json()
                )
                .then( result => {
                    globalThis.userData.id = result.id;
                    globalThis.userData.login = result.login;
                    globalThis.userData.email = result.email;
                    console.log("set GLOBAL USER LOGIN get user:", globalThis.userData.login);

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

export const FetchModule = new FetchModuleCl();
