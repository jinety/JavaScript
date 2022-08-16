import { isEmpty } from './validation';
import { EmptyText, MoviesApi, Messages } from './constant';

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
const updateBtn = document.getElementById('updateBtn');

/**
 * Display error message
 *
 * @param {HtmlInputElement} input - Input element
 * @param {string} msg - Show message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');

  errMessageEl.innerHTML = msg;
};

// Hide modal
const hideModal = () => {
  modal.classList.remove('modal-show');
};

// Show modal
const showModal = () => {
  modal.classList.add('modal-show');
};

const hideBtn = (button) => {
  button.classList.add('hide-btn');
};

const showBtn = (button) => {
  button.classList.remove('hide-btn');
};

const isValidForm = () => {
  const nameMovie = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  let isValid = false;

  // Movie title cannot be blank
  if (isEmpty(nameMovie)) {
    showErrorMessage(nameMovieInput, Messages.empty);
  } else {
    isValid = true;
    showErrorMessage(nameMovieInput, EmptyText);
  }

  // Director cannot be blank
  if (isEmpty(director)) {
    showErrorMessage(directorInput, Messages.empty);
  } else {
    isValid = true;
    showErrorMessage(directorInput, EmptyText);
  }

  // Nation cannot be blank
  if (isEmpty(nation)) {
    showErrorMessage(nationInput, Messages.empty);
  } else {
    isValid = true;
    showErrorMessage(nationInput, EmptyText);
  }

  return isValid;
};

/**
 * Takes data from the API and displays it on a table in HTML
 */
const renderTable = () => {
  fetch(MoviesApi)
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
              <button type="button" class="btn primary-btn table-update-btn" data-id=${movie.id}>Update</button>
            </td>
            <td>
              <button type="button" class="btn primary-btn" data-id=${movie.id}>Delete</button>
            </td>
          </tr>`;
      });

      tableBody.innerHTML = tableTemplate;
      const updateButtons = document.querySelectorAll('.table-update-btn');

      updateButtons.forEach((item) => {
        item.addEventListener('click', () => {
          showModal();
          hideBtn(createBtn);
          showBtn(updateBtn);
        });
      });
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

  fetch(MoviesApi, option)
    // Parses JSON response into native JavaScript objects
    .then((response) => response.json())
    .then(() => renderTable())
    // Show error message when API call is wrong
    .catch((error) => alert('An error occurred while creating movie', error));
};

const handleCreateForm = () => {
  const name = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  const url = `${MoviesApi}?name=${name}`;

  if (!isValidForm()) {
    return;
  }

  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((movieList) => {
      if (movieList.length === 0) {
        const formData = { name, director, nation };

        createMovie(formData);
        hideModal();
      } else {
        showErrorMessage(nameMovieInput, Messages.exist);
      }
    });
};

addBtn.addEventListener('click', () => {
  showModal();
  hideBtn(updateBtn);
  showBtn(cancelBtn);
});

// New movie will be created when clicking create button
createBtn.addEventListener('click', () => {
  handleCreateForm();
});

// Exit modal when clicking cancel button
cancelBtn.addEventListener('click', () => {
  hideModal();
});

// Display username after successful login
accountName.innerHTML = localStorage.getItem('username');

renderTable();
