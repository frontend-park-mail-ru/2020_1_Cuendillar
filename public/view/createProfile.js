import {showHeaderAndSideBar, createMainPage} from "./createMainPage.js"
import {FetchModule} from "../modules/fetchCases.js"

export function createProfile() {
    globalThis.CreatorModule.setLocation("/profile.html");
    showHeaderAndSideBar();
    const mainContent = document.getElementsByClassName("main_content")[0];
    mainContent.innerHTML = `
    <form   id = "profileForm" class="profile_form">
            <header>
                <h2>Настройки профиля</h2>
            </header>
            <main>
                <h3> login:"${globalThis.userData.login}"</h3>
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
              <img class="profile_avatar" src="assets/logoBadFront.png">
              <input type="file" name="avatar">
         <button type="submit">Сохранить аватар</button>
        
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

        if  (!globalThis.CreatorModule.checkProfileForm(email, password, passwordRep)) {
            alert("Пароли должны совпадать и быть > 4.");
            return;
        }

        if (password.length === 0) {
            password = ""
        }
        console.log("profile: try send:", password, email);

        var fromForm = new Object();
        fromForm.password  = password;
        fromForm.email = email;

        FetchModule.ChangeProfile(fromForm);

        createMainPage();
    });

    const profileFormAvatar = document.getElementById("profileFormAvatar");
    profileFormAvatar.addEventListener('submit', function(e) {
        e.preventDefault();

        var formData = new FormData(profileFormAvatar);

        // avatar send fetch here

    });
}