import { MOVIES_API } from '../constants/url-api.constant';
import { apiService } from './api.service';

export class MovieService {
  /**
   * Get all the movies in the server
   */
  static async getAllMovies() {
    const movies = await apiService.get(MOVIES_API);

    return movies;
  }
}
