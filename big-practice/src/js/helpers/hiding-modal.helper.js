export class HidingModal {
  /**
   * Hide modal
   *
   * @param {element} element - Element of modal
   */
  static hideModal(element) {
    element.classList.remove('modal-show');
  }
}
