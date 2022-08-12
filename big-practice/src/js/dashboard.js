// Query elements
const tableBody = document.getElementById('tableBody');
const nameMovieInput = document.getElementById('nameMovie');
const directorInput = document.getElementById('director');
const nationInput = document.getElementById('nation');
const createBtn = document.getElementById('createBtn');
const cancelBtn = document.getElementById('cancelBtn');
const accountName = document.querySelector('.account-name');
const addBtn = document.querySelector('.add-btn');
const modal = document.querySelector('.modal');
const moviesApi = 'http://localhost:3000/movies';
const EmptyText = '';

// Messages
const MESSAGES = {
  empty: 'Value should be not empty',
};

/**
 *  Display error message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');
  errMessageEl.innerHTML = msg;
};

// Display username after successful login
accountName.innerHTML = localStorage.getItem('username');

/**
 *  Checks for an empty value
 */
const isEmpty = (value) => (!value);

const isValidForm = () => {
  const nameMovieValue = nameMovieInput.value;
  const directorValue = directorInput.value;
  const nationValue = nationInput.value;
  let isValid = true;

  // Full name is required
  if (isEmpty(nameMovieValue)) {
    isValid = false;
    showErrorMessage(nameMovieInput, MESSAGES.empty);
  } else {
    showErrorMessage(nameMovieInput, EmptyText);
  }

  if (isEmpty(directorValue)) {
    isValid = false;
    showErrorMessage(directorInput, MESSAGES.empty);
  } else {
    showErrorMessage(directorInput, EmptyText);
  }

  if (isEmpty(nationValue)) {
    isValid = false;
    showErrorMessage(nationInput, MESSAGES.empty);
  } else {
    showErrorMessage(nationInput, EmptyText);
  }

  return isValid;
};

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
              <button type="button" class="btn primary-btn" data-id=${movie.id}>Update</button>
            </td>
            <td>
              <button type="button" class="btn primary-btn" data-id=${movie.id}>Delete</button>
            </td>
          </tr>`;
      });

      tableBody.innerHTML = tableTemplate;
    })
    // Display error message when retrieving data from Json server
    .catch((error) => alert('An error occurred while getting movie', error));
};

/**
 * Create new movie and save to database
 */
const createMovie = (data) => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch(moviesApi, option)
    // Parses JSON response into native JavaScript objects
    .then((response) => response.json())
    .then(() => renderTable())
    // Show error message when API call is wrong
    .catch((error) => alert('An error occurred while creating movie', error));
};

const handleCreateForm = () => {
  const name = nationInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  const formData = { name, director, nation };

  createMovie(formData);
};

const createForm = () => {
  if (isValidForm()) {
    handleCreateForm();
    renderTable();
    modal.classList.remove('modal-show');
  }
};

addBtn.addEventListener('click', () => {
  modal.classList.add('modal-show');
});

// New movie will be created when clicking create button
createBtn.addEventListener('click', createForm);

// Exit modal when clicking cancel button
cancelBtn.addEventListener('click', () => {
  modal.classList.remove('modal-show');
});
renderTable();
