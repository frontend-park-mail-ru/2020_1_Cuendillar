import {createProfile} from './createProfile.js';
import {setLocation} from './setLocate.js';
import {FetchRequests} from '../modules/fetchRequests.js';
import {SideBar} from '../components/sideBar/sideBar.js';
import {HeaderComp} from '../components/headerComp/header.js';

/**
 *  show header
 *
 * @return {void}
 */
export function showHeaderAndSideBar() {
  const headerComp = new HeaderComp('application');
  headerComp.render();

  // set struct of main page
  application.innerHTML += `
<div class="main_content_and_side_bar">
    <div class="main_content">
    загрузка...
    </div>
    

    <aside class="side_bar">
    </aside>

    
</div>`;

  const sideBar = new SideBar(); // use default value
  sideBar.render();

  const linkMainPage = document.getElementById('linkMainPage');
  linkMainPage.addEventListener('click', function(e) {
    e.preventDefault();
    createMainPage();
  });
  const profileMainLink = document.getElementById('profileMainLink');
  profileMainLink.addEventListener('click', function(e) {
    e.preventDefault();
    createProfile();
  });
  const logoutLink = document.getElementById('logoutLink');
  logoutLink.addEventListener('click', function(e) {
    e.preventDefault();

    FetchRequests.logOut();
  });
}

/**
 *  show mainPage
 *@param {boolean} repaintHeader - need paint header? need for new avatar
 * @return {void}
 */
export function createMainPage(repaintHeader = false) {
  if (repaintHeader) {
    showHeaderAndSideBar();
  }

  setLocation('/index.html', 'Main');
  showHeaderAndSideBar();
  const tasksSize = 10;
  FetchRequests.getTasks(tasksSize);
}

