/**
 * Get movie from database
 */
const getApi = (url, handleAfterSuccess) => {
  const options = {
    method: 'GET',
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => { handleAfterSuccess(data); })
    .catch((error) => alert('Error! An error occurred.', error));
};

/**
 * Create new movie and save to database
 */
const postApi = (url, data, handleAfterSuccess) => {
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
 * Update movie and save to database
 */
const putApi = (url, data, handleAfterSuccess) => {
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
 * Remove user from json server
 */
const deleteApi = (url, handleAfterSuccess) => {
  // DELETE method implementation
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(url, options)
    .then(() => handleAfterSuccess())
    .catch((error) => alert('An error occurred while removing movie', error));
};

export {
  getApi, postApi, putApi, deleteApi,
};
