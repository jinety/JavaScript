import { ACCOUNTS_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class AccountService {
  static async getLoginUser(email, password) {
    const url = `${ACCOUNTS_API}?email=${email}&password=${password}`;
    const account = await apiService.get(url);

    return account;
  }
}
