export class DocumentHelper {
  /**
   * Display error message
   *
   * @param {HtmlInputElement} input - Input element
   * @param {string} msg - Show message
   */
  static showErrorMessage(input, msg) {
    const errMessageEl = input.parentElement.querySelector('.warn-msg');

    errMessageEl.innerHTML = msg;
  }
}
