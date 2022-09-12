class ApiService {
  /**
   * Get by calling API
   */
  async get(url) {
    try {
      // GET method implementation
      const options = {
        method: 'GET',
      };
      const res = await fetch(url, options);

      return res.json();

    } catch (error) {
      alert('Error! An error occurred.', error);
    }
  }

  /**
   * Create new by calling API
   */
  async post(url, data) {
    try {
      // POST method implementation
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(url, option);

      return res.json();

    } catch (error) {
      alert('An error occurred while creating movie', error);
    }

  }

  /**
   * Update by calling API
   */
  async put(url, data) {
    try {
      // PUT method implementation
      const option = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(url, option);

      return res.json();

    } catch (error) {
      alert('An error occurred while update movie', error);
    }

  }

  /**
   * Remove by calling API
   */
  async delete(url) {
    try {
      // DELETE method implementation
      const option = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(url, option);

      return res.json();

    } catch (error) {
      alert('An error occurred while removing movie', error);
    }

  }
}

const apiService = new ApiService();

export { apiService };
