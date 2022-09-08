// import { Environment } from "./environment";

export class Messages {
  constructor() {
    // Url API
    this.ACCOUNT_API = "http://localhost:3000/accounts";
    this.MOVIES_API = "http://localhost:3000/movies";
    this.EMPTY_TEXT = "";
    this.emailWrongFormat = "Email is invalid format";
    this.incorrectLoginAccount = "Email or password is incorrect. Please re-enter";
    this.notAdminAccount = "The account is not admin account, please re-enter";
    this.exist = "Movie name already exists";
    this.empty = "Value should be not empty";
  }

  static emailWrongFormat = "Email is invalid format";

  static empty = "Value should be not empty";
}
