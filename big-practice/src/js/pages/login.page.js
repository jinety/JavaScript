import { Validation } from "../validates/form.validate";
import { Messages } from "../constants/message.constant";
import { ShowMessage } from "../helpers/show-message.helper";

class Login {
  constructor(validation, messages, showMessage) {
    this.validation = validation;
    this.messages = messages;
    this.showMessage = showMessage;
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.loginBtn = document.getElementById("loginBtn");
    this.generalWarnMsg = document.querySelector(".general-warn-msg");
    this.dashboardPage = "dashboard.html";
  }

  login() {
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const config = {
      email: ["empty", "formatEmail"],
      password: ["empty"],
    };
    const validate = this.validation.validateForm(data, config);
    const url = `${this.messages.ACCOUNT_API}?email=${data.email}&password=${data.password}`;

    if (!validate.isValid) {
      this.showMessage.showErrorMessage(this.emailInput, validate.errors.email);
      this.showMessage.showErrorMessage(this.passwordInput, validate.errors.password);
      return;
    }

    // Check valid user
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((userList) => {
        if (userList.length === 0) {
          this.showMessage.showErrorMessage(
            this.generalWarnMsg,
            this.messages.incorrectLoginAccount,
          );
          return;
        }

        // Non-admin account
        if (!userList[0].isAdmin) {
          this.showMessage.showErrorMessage(
            this.generalWarnMsg,
            this.messages.notAdminAccount,
          );
          return;
        }

        this.showMessage.showErrorMessage(this.emailInput, this.messages.EMPTY_TEXT);
        this.showMessage.showErrorMessage(this.passwordInput, this.messages.EMPTY_TEXT);
        this.showMessage.showErrorMessage(this.generalWarnMsg, this.messages.EMPTY_TEXT);

        // Save username to localStorage
        localStorage.setItem("username", userList[0].email);

        // Switch to dashboard page
        window.location.href = this.dashboardPage;
      });
  }

  // Click login button if successful will go to dashboard page
  bindLogin() {
    this.loginBtn.addEventListener("click", () => {
      this.login();
    });
  }

  // Prevent returning to login page if there is data in localStorage
  checkLocal() {
    if (localStorage.getItem("username")) {
      window.location.href = this.dashboardPage;
    }
  }
}

const loginController = new Login(new Validation(), new Messages(), new ShowMessage());

loginController.bindLogin();
