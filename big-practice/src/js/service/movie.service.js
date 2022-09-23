import { MOVIES_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class MovieService {
  /**
   * Get all movies in the database
   */
  static async getAll() {
    return await apiService.get(MOVIES_API);
  }

  static async getByName(name) {
    return await apiService.get(`${MOVIES_API}?name=${name}`);
  }
}
