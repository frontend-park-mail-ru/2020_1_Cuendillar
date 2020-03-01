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
  const mainContent = document.getElementsByClassName('main_content')[0];
  mainContent.innerHTML = `
    <div class="container">
  <img class="avatarTask" src="assets/logoBadFront.png" alt="Avatar">
  <p><span > task bubble sort O(n) .</span> Gerald from Rivia.</p>
  <p> Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
   Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
    Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
     Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
      Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
       Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of
        task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text
         of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long
          text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long text of task.
           Long text of task. Long text of task. Long text of task. Long text of task. Long text of task. Long
            text of task. </p>
  <h4> time by 21:00 00.00.00</h4>
</div>
`;
}
