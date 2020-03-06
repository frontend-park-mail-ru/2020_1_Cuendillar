import {showHeaderAndSideBar} from '../view/createMainPage.js';
import {setLocation} from './setLocate.js';
import {OneTaskComp} from '../components/oneTaskComp/oneTask.js';

/**
 *  show one task page
 *
 * @param {tasksParameters} dataForOneTask - title, text, time...
 * @return {void}
*/
export function createOneTask(dataForOneTask) {
  showHeaderAndSideBar();
  const oneTaskComp = new OneTaskComp(dataForOneTask, 'main_content');
  oneTaskComp.render();
  setLocation('/onetask', 'Task');
}
