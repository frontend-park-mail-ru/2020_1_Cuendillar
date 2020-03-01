import {FetchModule} from './fetchLogic.js';
import {serverLocate} from '../utils/constants.js';
import {createLogin} from '../view/createLogin.js';
import {createMainPage} from '../view/createMainPage.js';
import {createOneTask} from '../view/createOneTask.js';

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
        .then( (response) => createLogin() )
        .catch(function(error) {
          alert('Не удалось зарегистрироваться, пользователь с таким логином уже существует.');
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
        .then((res) => res.ok ? res : Promise.reject(res))
        .then((response) => {
          // @todo токен в глоабльную переменную и отправлять его вместе с запросами взаголовке +  go на вход
          // globalThis.userData.token = response.ge("X-Csrf-Token");
          // console.log("WE get:::", globalThis.userData.token);
          return response.json();
        },
        )
        .then((result) => {
          globalThis.userData.id = result.id;
          globalThis.userData.login = result.login;
          globalThis.userData.email = result.email;
          console.log('set GLOBAL USER LOGIN:', globalThis.userData.login);
          createMainPage();
        })
        .catch(function(error) {
          console.log('some signIN err');
          alert('Не удалось авторизоваться, неверная комбинация почта-пароль.');
          createLogin();
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
          globalThis.userData.email = null;
          globalThis.userData.login = null;
          globalThis.userData.id = null;
          createLogin();
        },
        )
        .catch(function(error) {
          alert('logout err');
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
          globalThis.userData.id = result.id;
          globalThis.userData.login = result.login;
          globalThis.userData.email = result.email;
          console.log('set GLOBAL USER LOGIN:', globalThis.userData.login);
          createMainPage();
        })
        .catch(function(error) {
          alert('Не удалось изменить профиль.');
        });
  }

  /**
     *  set userData and call createFunction after
     *
     * @param {function} createFunction -
     * @return {void}
     */
  static getUserByCookie(createFunction) {
    FetchModule.fetchRequest( {url: serverLocate + '/getuser'})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) =>
          response.json(),
        )
        .then( (result) => {
          globalThis.userData.id = result.id;
          globalThis.userData.login = result.login;
          globalThis.userData.email = result.email;
          if (createFunction === undefined) { // почему undefined ? если перезагружаюсь с index.html
            console.log('err: why show page:', window.location.pathname);
            createMainPage();
            return;
          }
          createFunction();
        })
        .catch(function(error) {
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
    FetchModule.fetchRequestSendAvatar( {url: serverLocate + '/sendAvatar', body: avatarData})
        .then((res) => res.ok ? res : Promise.reject(res))
        .then( (response) => {
          console.log('Аватарка загрузилась!');
        },
        )
        .catch(function(error) {
          alert('Не удалось загрузить аватар.');
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
          const mainContent = document.getElementsByClassName('main_content')[0];
          mainContent.innerHTML = window.fest['components/tasks.tmpl'](result);

          // globalThis.MainPageTasks = result;

          // set links to tasks
          result.forEach( (item, i, arr) => {
            const taskTitle = document.getElementById('taskID:'+item.id.toString());
            taskTitle.addEventListener('click', (e) => {
              e.preventDefault();

              this.getOneTask(item.id);
              createOneTask();
            });
          });
        },
        )
        .catch(function(error) {
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
          console.log('RESULT ONE TASK:::', result);

          const mainContent = document.getElementsByClassName('main_content')[0];

          mainContent.innerHTML = window.fest['components/oneTask.tmpl'](result);
        },
        )
        .catch(function(error) {
          console.log('Не удалось получить конкретное задание!');
        });
  }
}
