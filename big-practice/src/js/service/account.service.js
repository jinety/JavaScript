import { ACCOUNTS_API } from '../constants/url-api.constant';
import { MESSAGES, EMPTY_TEXT } from '../constants/message.constant';
import { DASHBOARD_PAGE, USERNAME_KEY } from '../constants/app.constant';
import { apiService } from './api.service';
import { DocumentHelper } from '../helpers/document.helper';

export class AccountService {
  static async getAccount(data) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const generalWarnMsg = document.querySelector('.general-warn-msg');
    const url = `${ACCOUNTS_API}?email=${data.email}&password=${data.password}`;

    try {
      const userList = await apiService.get(url);

      // IncorrectLoginAccount
      if (userList.length === 0) {
        DocumentHelper.showErrorMessage(
          generalWarnMsg,
          MESSAGES.incorrectLoginAccount,
        );
        DocumentHelper.showErrorMessage(emailInput, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(passwordInput, EMPTY_TEXT);

        return;
      }

      // Non-admin account
      if (!userList[0].isAdmin) {
        DocumentHelper.showErrorMessage(
          generalWarnMsg,
          MESSAGES.notAdminAccount,
        );
        DocumentHelper.showErrorMessage(emailInput, EMPTY_TEXT);
        DocumentHelper.showErrorMessage(passwordInput, EMPTY_TEXT);

        return;
      }

      DocumentHelper.showErrorMessage(emailInput, EMPTY_TEXT);
      DocumentHelper.showErrorMessage(passwordInput, EMPTY_TEXT);
      DocumentHelper.showErrorMessage(generalWarnMsg, EMPTY_TEXT);

      // Save username to localStorage
      localStorage.setItem(USERNAME_KEY, userList[0].email);

      // Switch to dashboard page
      window.location.href = DASHBOARD_PAGE;
    } catch {
      DocumentHelper.showErrorMessage(generalWarnMsg, MESSAGES.getAccountErr);
    }
  }
}
