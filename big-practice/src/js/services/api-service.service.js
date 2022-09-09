export class ApiService {
  /**
  * Get by calling API
  */
  static async getApi(url) {
    try {
      // GET method implementation
      this.options = {
        method: 'GET',
      };

      this.res = await fetch(url, this.options);
      this.result = await this.res.json();
    } catch (error) {
      alert('Error! An error occurred.', error);
    }
  }
}

/**
 * Create new by calling API
 */
const postApi = (url, data, handleAfterSuccess) => {
  // POST method implementation
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(url, option)
    // Parses JSON response into native JavaScript objects
    .then((response) => response.json())
    .then(() => handleAfterSuccess())
    // Show error message when API call is wrong
    .catch((error) => alert('An error occurred while creating movie', error));
};

/**
 * Update by calling API
 */
const putApi = (url, data, handleAfterSuccess) => {
  // PUT method implementation
  const option = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(url, option)
    // Parses JSON response into native JavaScript objects
    .then((response) => response.json())
    .then(() => handleAfterSuccess())
    // Show error message when API call is wrong
    .catch((error) => alert('An error occurred while update movie', error));
};

/**
 * Remove by calling API
 */
const deleteApi = (url, handleAfterSuccess) => {
  // DELETE method implementation
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(url, option)
    .then(() => handleAfterSuccess())
    // Show error message when API call is wrong
    .catch((error) => alert('An error occurred while removing movie', error));
};

export {
  postApi, putApi, deleteApi,
};
