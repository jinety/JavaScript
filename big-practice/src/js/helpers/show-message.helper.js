class DocumentHelper {
  /**
   * Display error message
   *
   * @param {HtmlInputElement} input - Input element
   * @param {string} msg - Show message
   */
  showErrorMessage(input, msg) {
    const errMessageEl = input.parentElement.querySelector('.warn-msg');

    errMessageEl.innerHTML = msg;
  }
}

const documentHelper = new DocumentHelper();

export { documentHelper };
