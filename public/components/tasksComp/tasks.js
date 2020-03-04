import {FetchRequests} from '../../modules/fetchRequests.js';
import {setLocation} from '../../view/setLocate.js';
import {showHeaderAndSideBar} from '../../view/createMainPage.js';

/**
 *  component tasks (list of tasks)
 *
 */
export class TasksComp {
  /**
     *  constructor tasks
     *
     * @param {array_of_map} data - list of tasks
     * @param {string} innerClassname - class name for search in doc
     */
  constructor(data, innerClassname = 'main_content') {
    this.data = data;
    this.innerClassname = innerClassname;
  }

  /**
     *  render tasks (use template)
     *
     * @return {void}
     */
  render() {
    const mainContent = document.getElementsByClassName(this.innerClassname)[0];
    mainContent.innerHTML = window.fest['components/tasks.tmpl'](this.data);
    // set links to tasks
    this.data.forEach( (item, i, arr) => {
      const taskTitle = document.getElementById('taskID:'+item.id.toString());
      taskTitle.addEventListener('click', (e) => {
        e.preventDefault();

        FetchRequests.getOneTask(item.id);
        setLocation('/onetask.html', 'Task');
        showHeaderAndSideBar();
      });
    });
  }
}
