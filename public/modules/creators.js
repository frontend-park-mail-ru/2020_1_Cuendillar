(function () {

    class CreatorModule {

        setLocation(curLoc){
            try {
                history.pushState(null, null, curLoc);
                return;
            } catch(e) {
                console.log("setLocation Err")
            }
            location.hash = '#' + curLoc;
        }

        checkRegistrationForm(registrationLogin, registrationPassword, registrationPasswordRep, registrationEmail) {
            return registrationPassword === registrationPasswordRep &&  registrationPassword.length > 4;
            //@todo add check symbols in login, strong of password ...
        }

        checkProfileForm(email, password, passwordRep) {
            return password === passwordRep;
            //@todo add check symbols in login, strong of password ...
        }

    }

    globalThis.CreatorModule = new CreatorModule();

})();