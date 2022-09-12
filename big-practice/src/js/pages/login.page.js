import { formValidate } from '../validates/form.validate';
import { apiService } from '../services/api.service';
import { documentHelper } from '../helpers/show-message.helper';
import { ACCOUNTS_API } from '../constants/url-api.constant';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';
import { DASHBOARD_PAGE } from '../constants/app.constant';

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
      documentHelper.showErrorMessage(this.emailInput, validate.errors.email);
      documentHelper.showErrorMessage(this.passwordInput, validate.errors.password);
      return;
    }

    const movieList = await apiService.get(url);

    if (movieList.length === 0) {
      documentHelper.showErrorMessage(
        this.generalWarnMsg,
        MESSAGES.incorrectLoginAccount,
      );
      documentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
      documentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);

      return;
    }

    // Non-admin account
    if (!movieList[0].isAdmin) {
      documentHelper.showErrorMessage(
        this.generalWarnMsg,
        MESSAGES.notAdminAccount,
      );
      documentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
      documentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);

      return;
    }

    documentHelper.showErrorMessage(this.emailInput, EMPTY_TEXT);
    documentHelper.showErrorMessage(this.passwordInput, EMPTY_TEXT);
    documentHelper.showErrorMessage(this.generalWarnMsg, EMPTY_TEXT);

    // Save username to localStorage
    localStorage.setItem('username', movieList[0].email);

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
  getDataLocal() {
    if (localStorage.getItem('username')) {
      window.location.href = DASHBOARD_PAGE;
    }
  }
}

const loginPage = new Login();

loginPage.addLoginEvent();
