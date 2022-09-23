import { MOVIES_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class MovieService {
  /**
   * Get all movies in the database
   */
  static async getAll() {
    return await apiService.get(MOVIES_API);
  }

  /**
   * Get movie by name in database
   *
   * @param {string} name - Movie name
   */
  static async getAllName(name) {
    return await apiService.get(`${MOVIES_API}?name=${name}`);
  }

  /**
   * Add new movies in database
   *
   * @param {string} data - The object contains the information of the movie
   */
  static async post(data) {
    return await apiService.post(MOVIES_API, data);
  }

  /**
   * Get movie by id in database
   *
   * @param {*} id - Id of the movie in the database
   */
  static async getById(id) {
    return await apiService.get(`${MOVIES_API}/${id}`);
  }

  /**
   * Update movie in database
   *
   * @param {*} id - Id of the movie in the database
   * @param {*} data - The object contains the information of the movie
   */
  static async update(id, data) {
    return apiService.put(`${MOVIES_API}/${id}`, data);
  }
}
