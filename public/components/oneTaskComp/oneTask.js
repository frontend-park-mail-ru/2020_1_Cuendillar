/**
 *  component one task page
 *
 */
export class OneTaskComp {
  /**
     *  constructor task
     *  @param {data} data - map that contains task parameters
     *  @param {string} innerClassname - class name for search in document
     */
  constructor(data, innerClassname) {
    this.data = data;
    this.innerClassname = innerClassname;
  }

  /**
     *  render one task
     *
     * @return {void}
     */
  render() {
    const mainContent = document.getElementsByClassName(this.innerClassname)[0];
    mainContent.innerHTML = window.fest['components/oneTask.tmpl'](this.data);
  }
}
