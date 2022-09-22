import { ACCOUNTS_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class AccountService {
  static async getAccount(data) {
    const url = `${ACCOUNTS_API}?email=${data.email}&password=${data.password}`;
    const account = await apiService.get(url);

    return account;
  }
}
