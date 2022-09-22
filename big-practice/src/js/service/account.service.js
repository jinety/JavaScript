import { ACCOUNTS_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class AccountService {
  /**
   * Get user login account from server
   *
   * @param {string} email - Username login to dashboard
   * @param {string} password - Password login to dashboard
   * @returns
   */
  static async getLoginUser(email, password) {
    const url = `${ACCOUNTS_API}?email=${email}&password=${password}`;
    const account = await apiService.get(url);

    return account;
  }
}
