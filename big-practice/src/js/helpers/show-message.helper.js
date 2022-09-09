export class ShowMessage {
  /**
  * Display error message
  *
  * @param {HtmlInputElement} input - Input element
  * @param {string} msg - Show message
  */
  showErrorMessage(input, msg) {
    this.errMessageEl = input.parentElement.querySelector(".warn-msg");

    this.errMessageEl.innerHTML = msg;
  }
}
