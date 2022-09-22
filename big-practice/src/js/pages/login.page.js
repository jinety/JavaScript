import { formValidate } from '../validates/form.validate';
import { DocumentHelper } from '../helpers/document.helper';
import { AccountService } from '../service/account.service';
import { DASHBOARD_PAGE, USERNAME_KEY } from '../constants/app.constant';

class Login {
  loginBtn = document.getElementById('loginBtn');
  emailInput = document.getElementById('email');
  passwordInput = document.getElementById('password');
  generalWarnMsg = document.querySelector('.general-warn-msg');

  constructor() {
    this.addLoginEvent();
    this.checkUserLogin();
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

    if (!validate.isValid) {
      DocumentHelper.showErrorMessage(this.emailInput, validate.errors.email);
      DocumentHelper.showErrorMessage(this.passwordInput, validate.errors.password);

      return;
    }

    await AccountService.getAccount(data);
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
  checkUserLogin() {
    if (localStorage.getItem(USERNAME_KEY)) {
      window.location.href = DASHBOARD_PAGE;
    }
  }
}

const loginPage = new Login();
