(function () {

    class FetchModule {

         RegistrationForm(fromForm){

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
                .then( response => globalThis.CreatorModule.createLogin() )
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
                    globalThis.CreatorModule.createMainPage();
                })
                .catch(function (error) {
                    console.log("some signIN err");
                    alert("Не удалось авторизоваться, неверная комбинация почта-пароль.");
                    globalThis.CreatorModule.createLogin();
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
                        globalThis.CreatorModule.createLogin();
                    }
                )
                .catch(function (error) {
                    alert("logout err");
                    globalThis.CreatorModule.createLogin();
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
                    globalThis.CreatorModule.createMainPage();
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
                        globalThis.CreatorModule.createMainPage();
                        return;
                    }
                    createFunction();
                })
                .catch(function (error) {
                    globalThis.CreatorModule.createLogin();
                });
        }
    }

    globalThis.FetchModule = new FetchModule();

})();
