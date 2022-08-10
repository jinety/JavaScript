// Query elements
const tableBody = document.getElementById('tableBody');
const accountName = document.getElementById('accountName');
const moviesApi = 'http://localhost:3000/movies';

// Display username after successful login
accountName.innerHTML = localStorage.getItem('username');

/**
 * Takes data from the API and displays it on a table in HTML
 */
const renderTable = () => {
  fetch(moviesApi)
    // Parses JSON response into native JavaScript objects
    .then((response) => response.json())
    .then((movies) => {
      let tableTemplate = '';

      movies.forEach((movie) => {
        tableTemplate += ` 
          <tr class="content-row">
            <td>${movie.id}</td>
            <td>${movie.name}</td>
            <td>${movie.director}</td>
            <td>${movie.nation}</td>
            <td>
              <button type="button" class="primary-btn" data-id=${movie.id}>Update</button>
            </td>
            <td>
              <button type="button" class="primary-btn" data-id=${movie.id}>Delete</button>
            </td>
          </tr>`;
      });

      tableBody.innerHTML = tableTemplate;
    })
    .catch((error) => alert('An error occurred while getting movie', error));
};

renderTable();
