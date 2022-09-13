import { EMPTY_TEXT } from '../constants/message.constant';

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

  /**
    * Clean error message
    *
    * @param {HtmlInputElement} element - Element input
    */
  cleanErrorMessage(element) {
    this.showErrorMessage(element, EMPTY_TEXT);
  }

  /**
   * Hide element
   *
   * @param {ElementCSSInlineStyle} element - Element
   */
  static hideElement(element) {
    element.classList.add('hide');
  }

  /**
   * Show element
   *
   * @param {ElementCSSInlineStyle} element - Element
   */
  static showElement(element) {
    element.classList.remove('hide');
  }
}
