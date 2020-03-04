/**
 *  component side bar
 *
 */
export class SideBar {
  /**
     *  constructor header
     *
     * @param {array} list - list of leaders
     * @param {string} classElement - class for search in document
     * @return {void}
   */
  constructor(list = [' 1 место логин', ' 2 место логин', ' 3 место логин',
    ' 4 место логин', ' 5 место логин'], classElement= 'side_bar') {
    this.list = list;
    this.classElement = classElement;
  }

  /**
     *  render side bar
     *
     * @return {void}
   */
  render() {
    const sideBarContent = document.getElementsByClassName(this.classElement)[0];
    sideBarContent.innerHTML = ` <div class="leaders_table">
            <h2> Лидеры </h2>
            <h4> ${this.list[0]}</h4>
            <h4> ${this.list[1]}</h4>
            <h4> ${this.list[2]}</h4>
            <h4> ${this.list[3]}</h4>
            <h4> ${this.list[4]}</h4>
        </div>
        <div>
            Может быть какие-то новости
        </div>`;
  }
}
