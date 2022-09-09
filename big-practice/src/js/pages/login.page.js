import { FormValidate } from '../validates/form.validate';
import { ApiService } from '../services/api-service.service';
import { Document } from '../helpers/show-message.helper';
import { ACCOUNT_API } from '../constants/url-api.constant';
import { MESSAGES, EMPTY_TEXT, DASHBOARD_PAGE } from '../constants/message.constant';

class Login {
  constructor() {
    // Query elements
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.loginBtn = document.getElementById('loginBtn');
    this.generalWarnMsg = document.querySelector('.general-warn-msg');
  }

  /**
   * Handling account login to dashboard
   */
  async login() {
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
      Document.showErrorMessage(this.emailInput, validate.errors.email);
      Document.showErrorMessage(this.passwordInput, validate.errors.password);
      return;
    }

    await ApiService.getApi(url);
    if (ApiService.result.length === 0) {
      Document.showErrorMessage(
        this.generalWarnMsg,
        MESSAGES.incorrectLoginAccount,
      );
      Document.showErrorMessage(this.emailInput, EMPTY_TEXT);
      Document.showErrorMessage(this.passwordInput, EMPTY_TEXT);

      return;
    }

    // Non-admin account
    if (!ApiService.result[0].isAdmin) {
      Document.showErrorMessage(
        this.generalWarnMsg,
        MESSAGES.notAdminAccount,
      );
      Document.showErrorMessage(this.emailInput, EMPTY_TEXT);
      Document.showErrorMessage(this.passwordInput, EMPTY_TEXT);

      return;
    }

    Document.showErrorMessage(this.emailInput, EMPTY_TEXT);
    Document.showErrorMessage(this.passwordInput, EMPTY_TEXT);
    Document.showErrorMessage(this.generalWarnMsg, EMPTY_TEXT);

    // Save username to localStorage
    localStorage.setItem('username', ApiService.result[0].email);

    // Switch to dashboard page
    window.location.href = DASHBOARD_PAGE;
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
  static getDataLocal() {
    if (localStorage.getItem('username')) {
      window.location.href = DASHBOARD_PAGE;
    }
  }
}

const loginPage = new Login();

loginPage.addLoginEvent();
