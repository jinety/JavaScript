import { isEmpty } from './validation';
import { EmptyText, MoviesApi, Messages } from './constant';
import { getApi, postApi, putApi } from './api-service';

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
const form = document.querySelector('.form');

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

/**
 * Hide modal
 */
const hideModal = () => {
  modal.classList.remove('modal-show');
};

/**
 * Show modal
 */
const showModal = () => {
  modal.classList.add('modal-show');
};

/**
 * Hide element
 *
 * @param {HtmlInputElement} element - Input element
 */
const hideElement = (element) => {
  element.classList.add('hide');
};

/**
 * Show element
 *
 * @param {HtmlInputElement} element - Input element
 */
const showElement = (element) => {
  element.classList.remove('hide');
};

/**
 * Valid Form
 */
const isValidForm = () => {
  const nameMovie = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  let isValid = true;

  // Movie title cannot be blank
  if (isEmpty(nameMovie)) {
    showErrorMessage(nameMovieInput, Messages.empty);
    isValid = false;
  } else {
    showErrorMessage(nameMovieInput, EmptyText);
  }

  // Director cannot be blank
  if (isEmpty(director)) {
    showErrorMessage(directorInput, Messages.empty);
    isValid = false;
  } else {
    showErrorMessage(directorInput, EmptyText);
  }

  // Nation cannot be blank
  if (isEmpty(nation)) {
    showErrorMessage(nationInput, Messages.empty);
    isValid = false;
  } else {
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
              <button type="button" class="btn table-update-btn" data-id=${movie.id}>Update</button>
            </td>
            <td>
              <button type="button" class="btn" data-id=${movie.id}>Delete</button>
            </td>
          </tr>`;
      });

      tableBody.innerHTML = tableTemplate;
      const updateButtons = document.querySelectorAll('.table-update-btn');

      updateButtons.forEach((item) => {
        item.addEventListener('click', () => {
          const movieId = item.dataset.id;

          showModal();
          hideElement(createBtn);
          showElement(updateBtn);
          getApi(`${MoviesApi}/${movieId}`, (movieData) => {
            nameMovieInput.value = movieData.name;
            directorInput.value = movieData.director;
            nationInput.value = movieData.nation;
            form.setAttribute('data-id', movieId);
          });
        });
      });
    })

    // Display error message when retrieving data from Json server
    .catch((error) => alert('An error occurred while getting movie', error));
};

/**
 * Handle create form
 */
const handleCreateForm = () => {
  const name = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;

  if (!isValidForm()) {
    return;
  }

  getApi(`${MoviesApi}?name=${name}`, (movieList) => {
    if (movieList.length === 0) {
      const formData = { name, director, nation };

      postApi(MoviesApi, formData, () => { renderTable(); });
      hideModal();
    } else {
      showErrorMessage(nameMovieInput, Messages.exist);
    }
  });
};

/**
 * Handle update form
 */
const handleUpdateForm = () => {
  const name = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  const formData = { name, director, nation };
  const formMovieId = form.getAttribute('data-id');

  if (!isValidForm()) {
    return;
  }

  getApi(`${MoviesApi}?name=${name}`, (movieList) => {
    if (movieList.length === 0 || movieList[0].id === parseInt(formMovieId, 10)) {
      putApi(`${MoviesApi}/${formMovieId}`, formData, () => { renderTable(); });
      hideModal();
    } else {
      showErrorMessage(nameMovieInput, Messages.exist);
    }
  });
};

// Popup to add user when clicking on Add button.
addBtn.addEventListener('click', () => {
  showModal();
  hideElement(updateBtn);
  showElement(createBtn);
});

// New movie will be created when clicking create button
createBtn.addEventListener('click', () => {
  handleCreateForm();
});

// Exit modal when clicking cancel button
cancelBtn.addEventListener('click', () => {
  hideModal();
});

// Movie will be updated when the update button is clicked
updateBtn.addEventListener('click', () => {
  handleUpdateForm();
});

// Display username after successful login
accountName.innerHTML = localStorage.getItem('username');

renderTable();
