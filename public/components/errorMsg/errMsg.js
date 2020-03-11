/**
 *  component one err msg
 *
 */
export class ErrMsg {
  /**
     *  constructor err message
     * @param {string} message - err message
     * @param {string} innerId - place for message
     */
  constructor(message, innerId) {
    this.message = message;
    this.errPlace = document.getElementById(innerId );
  }

  /**
     *  render err
     *
     * @return {void}
     */
  render() {
    this.errPlace.innerHTML = `<h2 class="error_msg" > ${this.message} </h2>`;
  }
}
