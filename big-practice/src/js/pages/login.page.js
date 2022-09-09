import { Validation } from "../validates/form.validate";
import { Messages } from "../constants/message.constant";
import { ShowMessage } from "../helpers/show-message.helper";
import { UrlApi } from "../constants/url-api.constant";

class Login {
  constructor(validation, messages, showMessage) {
    // Query elements
    this.validation = validation;
    this.messages = messages;
    this.showMessage = showMessage;
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.loginBtn = document.getElementById("loginBtn");
    this.generalWarnMsg = document.querySelector(".general-warn-msg");
    this.dashboardPage = "dashboard.html";
  }

  // Handling account login to dashboard
  async login() {
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const config = {
      email: ["empty", "formatEmail"],
      password: ["empty"],
    };
    const validate = this.validation.validateForm(data, config);
    const url = `${UrlApi.ACCOUNT_API}?email=${data.email}&password=${data.password}`;

    if (!validate.isValid) {
      this.showMessage.showErrorMessage(this.emailInput, validate.errors.email);
      this.showMessage.showErrorMessage(this.passwordInput, validate.errors.password);
      return;
    }

    // Check valid user
    const res = await fetch(url, { method: "GET" });
    if (res.ok) {
      const result = await res.json();
      if (result.length === 0) {
        this.showMessage.showErrorMessage(
          this.generalWarnMsg,
          this.messages.INCORRECT_LOGIN_ACCOUNT,
        );

        return;
      }

      // Non-admin account
      if (!result[0].isAdmin) {
        this.showMessage.showErrorMessage(
          this.generalWarnMsg,
          this.messages.NOT_ADMIN_ACCOUNTt,
        );

        return;
      }

      this.showMessage.showErrorMessage(this.emailInput, this.messages.EMPTY_TEXT);
      this.showMessage.showErrorMessage(this.passwordInput, this.messages.EMPTY_TEXT);
      this.showMessage.showErrorMessage(this.generalWarnMsg, this.messages.EMPTY_TEXT);

      // Save username to localStorage
      localStorage.setItem("username", result[0].email);

      // Switch to dashboard page
      window.location.href = this.dashboardPage;
    }
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

const loginController = new Login(
  new Validation(),
  new Messages(),
  new ShowMessage(),
  new UrlApi(),
);

loginController.bindLogin();
