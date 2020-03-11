import {FetchModule} from './fetchLogic.js';
import {serverLocate} from '../utils/constants.js';
import {createLogin} from '../view/createLogin.js';
import {createMainPage} from '../view/createMainPage.js';
import {getRandomAvatarPath} from '../utils/randomPath.js';
import {default as CurrentUser} from './userDataSingl.js';
import {TasksComp} from '../components/tasksComp/tasks.js';
import {createProfile} from '../view/createProfile.js';
import {createOneTask} from '../view/createOneTask.js';
import {ErrMsg} from '../components/errorMsg/errMsg.js';

/**
 *  Use logic FetchModule and work with promises
 */
export class FetchRequests {
  /**
     *  Send registration from
     *
     * @param {body} fromForm - for body
     * @return {void}
     */
  static registrationForm(fromForm) {
    FetchModule.fetchRequest( {url: serverLocate + '/registration', body: fromForm})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then((res) => createLogin())
        .catch(function(error) {
          const registrationErr = document.getElementById('registration_error_msg');
          registrationErr.innerText = 'Не удалось зарегистрироваться, пользователь с таким логином уже существует.';
        });
  }

  /**
     *  Send signIn from
     *
     * @param {body} fromForm - for body
     * @return {void}
     */
  static signInForm(fromForm) {
    FetchModule.fetchRequest({url: serverLocate + '/signin', body: fromForm})
        .then((res) => {
          return res.ok ? res : Promise.reject(res);
        })
        .then((response) => {
          return response.json();
        },
        )
        .then((result) => {
          CurrentUser.Data.token = result.token;
          CurrentUser.Data.id = result.id;
          CurrentUser.Data.login = result.login;
          CurrentUser.Data.email = result.email;
          CurrentUser.Data.avatarPath = getRandomAvatarPath();
          createMainPage();
        })
        .catch(function(error) {
          createLogin();
          const loginErr = document.getElementById('login_error_msg');
          loginErr.innerText = 'Не удалось авторизоваться, неверная комбинация почта-пароль.';
        });
  }

  /**
     *  logOut
     *  go server check cookies and logout
     * @return {void}
     */
  static logOut() {
    FetchModule.fetchRequest( {url: serverLocate + '/logout'})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) => {
          CurrentUser.Data.email = null;
          CurrentUser.Data.login = null;
          CurrentUser.Data.id = null;
          createLogin();
        },
        )
        .catch((error) =>{
          console.log('logOut err');
          createLogin();
        });
  }

  /**
     *  Send changes from
     *
     * @param {body} fromForm - for body
     * @return {void}
     */
  static changeProfile(fromForm) {
    FetchModule.fetchRequest( {url: serverLocate + '/changeprofile', body: fromForm})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) =>
          response.json(),
        )
        .then( (result) => {
          CurrentUser.Data.id = result.id;
          CurrentUser.Data.login = result.login;
          CurrentUser.Data.email = result.email;
          createProfile(true);
        })
        .catch((error) => {
          const err = new ErrMsg('Не удалось изменить профиль.', 'profile_error_msg');
          err.render();
        });
  }

  /**
     *  set userData and call createFunction after
     *
     * @param {function} createFunction -
     * @return {void}
     */
  static getUserByCookie(createFunction = createMainPage) {
    FetchModule.fetchRequest( {url: serverLocate + '/getuser'})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) =>
          response.json(),
        )
        .then( (result) => {
          CurrentUser.Data.id = result.id;
          CurrentUser.Data.login = result.login;
          CurrentUser.Data.email = result.email;
          CurrentUser.Data.token = result.token;
          createFunction(true);
        })
        .catch((error) =>{
          console.log(error);
          createLogin();
        });
  }

  /**
     *  send avatar
     *
     * @param {image} avatarData -avatar
     * @return {void}
     */
  static sendUserAvatar(avatarData) {
    FetchModule.fetchRequestSendImage( {url: serverLocate + '/sendAvatar', body: avatarData})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) => {
          CurrentUser.Data.avatarPath = getRandomAvatarPath();
          createProfile(true);
        },
        )
        .catch((error) =>{
          const err = new ErrMsg('Не удалось загрузить аватар.', 'profile_error_msg_avatar');
          err.render();
        });
  }


  /**
     *  get task (if server don't have numberoftask, we will get less)
     *
     * @param {int} numberoftask - ask of size task
     * @return {void}
     */
  static getTasks(numberoftask) {
    const body = {'numberoftask': numberoftask};
    FetchModule.fetchRequest( {url: serverLocate + '/getTasks', body: body})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) => response.json(),
        )
        .then((result) => {
          // render tasks
          const tasksComp = new TasksComp(result); // second param default
          tasksComp.render();
        },
        )
        .catch((error) =>{
          console.log(error);
          console.log('Не удалось получить задания!');
        });
  }

  /**
     *  get one task information by id
     *
     * @param {int} taskId - task id
     * @return {void}
     */
  static getOneTask(taskId) {
    const body = {'taskId': taskId};
    FetchModule.fetchRequest( {url: serverLocate + '/getOneTask', body: body})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) => response.json(),
        )
        .then((result) => {
          createOneTask(result);
        },
        )
        .catch((error) => {
          console.log('Не удалось получить конкретное задание');
        });
  }
}
