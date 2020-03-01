import {showHeaderAndSideBar} from '../view/createMainPage.js';
import {setLocation} from './setLocate.js';

/**
 *  show one task page
 *
 * @return {void}
 */
export function createOneTask() {
  setLocation('/onetask.html', 'Task');
  showHeaderAndSideBar();
}
