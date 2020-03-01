import {createProfile} from "./createProfile.js"
import {createOneTask} from "./createOneTask.js"
import {setLocation} from "./setLocate.js"
import {FetchRequests} from "../modules/fetchRequests.js"
import {getRandomAvatarPath} from "./createProfile.js"

export function showHeaderAndSideBar() {
    var avatarPath = getRandomAvatarPath();
    application.innerHTML =`

    <header class="main_header">
   
    <div class="header_links">
     <h2 class="header_siteName">Cuendillar</h2>
        <a id="linkMainPage" class="header_one_link" href="index.html">Главная</a>
        <a id="profileMainLink" class="header_one_link" href="profile.html">Профиль</a>
        <a class="header_one_link" href="#">Что-то еще</a>
        <a class="header_one_link" href="#">И еще что-то</a>
    </div>
    
    <div class="header_profile_info">
             <div class="login_in_header" href="#">${globalThis.userData.login}</div>
            <img class="avatar_header" src="${avatarPath}">
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

        FetchRequests.LogOut();
    });
}


export function createMainPage() {
    setLocation("/index.html", "Main");
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

