import { FormValidate } from '../validates/form.validate';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';
import { ShowMessage } from '../helpers/show-message.helper';
import { ACCOUNT_API } from '../constants/url-api.constant';
import { ApiService } from '../services/api-service.service';

class Login {
  constructor() {
    // Query elements
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.loginBtn = document.getElementById('loginBtn');
    this.generalWarnMsg = document.querySelector('.general-warn-msg');
    this.dashboardPage = 'dashboard.html';
  }

  /**
   * Handling account login to dashboard
   */
  login() {
    const data = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const config = {
      email: ['empty', 'formatEmail'],
      password: ['empty'],
    };
    const validate = FormValidate.validateForm(data, config);
    const url = `${ACCOUNT_API}?email=${data.email}&password=${data.password}`;

    if (!validate.isValid) {
      ShowMessage.showErrorMessage(this.emailInput, validate.errors.email);
      ShowMessage.showErrorMessage(this.passwordInput, validate.errors.password);
      return;
    }

    ApiService.getApi(url, (result) => {
      if (result.length === 0) {
        ShowMessage.showErrorMessage(
          this.generalWarnMsg,
          MESSAGES.incorrectLoginAccount,
        );
        ShowMessage.showErrorMessage(this.emailInput, EMPTY_TEXT);
        ShowMessage.showErrorMessage(this.passwordInput, EMPTY_TEXT);

        return;
      }

      // Non-admin account
      if (!result[0].isAdmin) {
        ShowMessage.showErrorMessage(
          this.generalWarnMsg,
          MESSAGES.notAdminAccount,
        );
        ShowMessage.showErrorMessage(this.emailInput, EMPTY_TEXT);
        ShowMessage.showErrorMessage(this.passwordInput, EMPTY_TEXT);

        return;
      }

      ShowMessage.showErrorMessage(this.emailInput, EMPTY_TEXT);
      ShowMessage.showErrorMessage(this.passwordInput, EMPTY_TEXT);
      ShowMessage.showErrorMessage(this.generalWarnMsg, EMPTY_TEXT);

      // Save username to localStorage
      localStorage.setItem('username', result[0].email);

      // Switch to dashboard page
      window.location.href = this.dashboardPage;
    });
  }

  /**
   * Click login button if successful will go to dashboard page
   */
  addLoginEvent() {
    this.loginBtn.addEventListener('click', () => {
      this.login();
    });
  }

  /**
   * Prevent returning to login page if there is data in localStorage
   */
  getDataLocal() {
    if (localStorage.getItem('username')) {
      window.location.href = this.dashboardPage;
    }
  }
}

const loginPage = new Login();

loginPage.addLoginEvent();
