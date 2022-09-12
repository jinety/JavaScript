import { formValidate } from '../validates/form.validate';
import { apiService } from '../services/api.service';
import { DocumentHelper } from '../helpers/show-message.helper';
import { ACCOUNTS_API } from '../constants/url-api.constant';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';
import { DASHBOARD_PAGE, USERNAME_KEY } from '../constants/app.constant';

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
    const validate = formValidate.validateForm(data, config);
    const url = `${ACCOUNTS_API}?email=${data.email}&password=${data.password}`;

    if (!validate.isValid) {
      DocumentHelper.showErrorMessage(this.emailInput, validate.errors.email);
      DocumentHelper.showErrorMessage(this.passwordInput, validate.errors.password);

      return;

    }

    const movieList = await apiService.get(url);

    // IncorrectLoginAccount
    if (movieList.length === 0) {
      DocumentHelper.showErrorMessage(
        this.generalWarnMsg,
        MESSAGES.incorrectLoginAccount,
      );
      DocumentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
      DocumentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);

      return;

    }

    // Non-admin account
    if (!movieList[0].isAdmin) {
      DocumentHelper.showErrorMessage(
        this.generalWarnMsg,
        MESSAGES.notAdminAccount,
      );
      DocumentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
      DocumentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);

      return;

    }

    DocumentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
    DocumentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);
    DocumentHelper.showErrorMessage(this.generalWarnMsg, EMPTY_TEXT);

    // Save username to localStorage
    localStorage.setItem(USERNAME_KEY, movieList[0].email);

    // Switch to dashboard page
    window.location.href = DASHBOARD_PAGE;
  }

  /**
   * Click login button if successful will go to dashboard page
   */
  addLoginEvent() {
    this.loginBtn.addEventListener('click', async () => {
      await this.login();
    });
  }

  /**
   * Prevent returning to login page if there is data in localStorage
   */
  getDataLocal() {
    if (localStorage.getItem(USERNAME_KEY)) {
      window.location.href = DASHBOARD_PAGE;
    }
  }
}

const loginPage = new Login();

loginPage.addLoginEvent();
