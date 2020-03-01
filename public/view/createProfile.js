import {showHeaderAndSideBar, createMainPage} from "./createMainPage.js"
import {setLocation} from "./setLocate.js"
import {FetchRequests} from "../modules/fetchRequests.js";
import {serverLocate} from "../utils/constants.js";


export function getRandomAvatarPath(randomPartLength = 20) {
    var random           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < randomPartLength; i++ ) {
        random += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return serverLocate + "/getAvatar" + globalThis.userData.email + random
}

function checkProfileForm(email, password, passwordRep) {
    const minPasswordLength = 4;
    if (length(password) < minPasswordLength) {
        alert("Пароль должен содержать хотя бы 4 символа.");
        return false;
    }
    if (password !== passwordRep) {
        alert("Пароли должны совпадать.");
        return false;
    }
    //toDo add check string password
    return true;
}

export function createProfile() {
    setLocation("/profile.html", "Profile");
    showHeaderAndSideBar();
    var avatarPath = getRandomAvatarPath();
    console.log("MY RANDOM PARH:", avatarPath)
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
    <form   id = "profileForm" class="profile_form">
            <header>
                <h2>Настройки профиля</h2>
            </header>
            <main>
                <h3> Login:${globalThis.userData.login}</h3>
                <input id="profilePass" name="ProfPass" value="" type="password"  placeholder="Сменить пароль">
                <input id="profilePassRep" name="repProfPass" value="" type="password" placeholder="Повторите новый пароль">
                <input id="profileEmail" type="newemail" value="${globalThis.userData.email}" placeholder="email">
            </main>
            <footer>
                <button type="submit">Сохранить</button>
            </footer>
        </form>
        
        <form id = "profileFormAvatar" class="profile_form" enctype="multipart/form-data">
        <header>
               <h2>Изменение аватара</h2>
            </header>
              <img class="profile_avatar" src="${avatarPath}">
            
              <div>
              <input type="file" name="avatar">
         <button  type="submit">Сохранить аватар</button>
        </div>
</form>
`;
    const profileForm = document.getElementById("profileForm");
    const profilePassword = document.getElementById('profilePass');
    const profilePasswordRep = document.getElementById('profilePassRep');
    const profileEmail = document.getElementById('profileEmail');

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var password = profilePassword.value.trim();
        const passwordRep = profilePasswordRep.value.trim();
        const email = profileEmail.value.trim();

        if  (!checkProfileForm(email, password, passwordRep))
            return;

        console.log("profile: try send:", password, email);

        var fromForm = new Object();
        fromForm.password  = password;
        fromForm.email = email;

        FetchRequests.ChangeProfile(fromForm);

        createMainPage();
    });

    const profileFormAvatar = document.getElementById("profileFormAvatar");
    profileFormAvatar.addEventListener('submit', function(e) {
        e.preventDefault();

        var avatar = new FormData(profileFormAvatar);

        FetchRequests.SendUserAvatar(avatar);
        createMainPage();
    });
}