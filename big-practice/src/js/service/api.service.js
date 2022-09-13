class ApiService {
  /**
   * Get by calling API
   */
  async get(url) {
    // GET method implementation
    const options = {
      method: 'GET',
    };
    const res = await fetch(url, options);

    return res.json();
  }

  /**
   * Create new by calling API
   */
  async post(url, data) {
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
  }

  /**
   * Update by calling API
   */
  async put(url, data) {
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
  }

  /**
   * Remove by calling API
   */
  async delete(url) {
    // DELETE method implementation
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, option);

    return res.json();
  }
}

const apiService = new ApiService();

export { apiService };
