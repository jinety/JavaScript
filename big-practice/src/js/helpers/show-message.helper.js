export class ShowMessage {
  showErrorMessage(input, msg) {
    this.errMessageEl = input.parentElement.querySelector(".warn-msg");

    this.errMessageEl.innerHTML = msg;
  }
}
