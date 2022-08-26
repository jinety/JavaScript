import { isEmpty, validateForm } from './validation';
import { EMPTY_TEXT, MOVIES_API, MESSAGES } from './constant';
import {
  getApi, postApi, putApi, deleteApi,
} from './api-service';

// Query elements
const tableBody = document.getElementById('tableBody');
const nameMovieInput = document.getElementById('nameMovie');
const directorInput = document.getElementById('director');
const nationInput = document.getElementById('nation');
const formCreateBtn = document.getElementById('createBtn');
const accountName = document.querySelector('.account-name');
const addBtn = document.querySelector('.add-btn');
const formUpdateBtn = document.getElementById('updateBtn');
const form = document.querySelector('.form');
const modalForm = document.querySelector('.modal-form');
const modalWarning = document.querySelector('.modal-warning');
const formCancelBtn = document.querySelector('.modal-form .button-box .cancel-btn');
const warningCancelBtn = document.querySelector('.modal-warning .button-box .cancel-btn');
const warningDeleteBtn = document.querySelector('.delete-button');
const logoutBtn = document.querySelector('.logout-btn');
const loginPage = 'login.html';

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
 *
 * @param {element} element - Element of modal
 */
const hideModal = (element) => {
  element.classList.remove('modal-show');
};

/**
 * Show modal
 *
 * @param {element} element - Element of modal
 */
const showModal = (element) => {
  element.classList.add('modal-show');
};

/**
 * Hide element
 *
 * @param {element} element - Element
 */
const hideElement = (element) => {
  element.classList.add('hide');
};

/**
 * Show element
 *
 * @param {element} element - Element
 */
const showElement = (element) => {
  element.classList.remove('hide');
};

/**
 * Clean error message
 *
 * @param {HtmlInputElement} element - Element input
 */
const cleanErrorMessage = (element) => {
  showErrorMessage(element, EMPTY_TEXT);
};

/**
 * Modal form update will appear when clicking the update button in the table
 *
 * @param {element} item - Table update button
 */
const tableUpdateBtn = (item) => {
  const movieId = item.dataset.id;

  showModal(modalForm);
  getApi(`${MOVIES_API}/${movieId}`, (movieData) => {
    nameMovieInput.value = movieData.name;
    directorInput.value = movieData.director;
    nationInput.value = movieData.nation;
    form.setAttribute('data-id', movieId);
  });
};

/**
 * Modal warning will appear when clicking delete button in the table
 *
 * @param {element} item - Table delete button
 */
const tableDeleteBtn = (item) => {
  const movieId = item.dataset.id;

  showModal(modalWarning);
  warningDeleteBtn.setAttribute('data-id', movieId);
};

/**
 * Takes data from the API and displays it on a table in HTML
 */
const renderTable = () => {
  fetch(MOVIES_API)
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
              <button type="button" class="btn table-delete-btn" data-id=${movie.id}>Delete</button>
            </td>
          </tr>`;
      });

      tableBody.innerHTML = tableTemplate;
      const updateButtons = document.querySelectorAll('.table-update-btn');
      const deleteButtons = document.querySelectorAll('.table-delete-btn');

      updateButtons.forEach((item) => {
        item.addEventListener('click', () => {
          tableUpdateBtn(item);
          hideElement(formCreateBtn);
          showElement(formUpdateBtn);
        });
      });

      deleteButtons.forEach((item) => {
        item.addEventListener('click', () => {
          tableDeleteBtn(item);
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
  const data = {
    name: nameMovieInput.value,
    director: directorInput.value,
    nation: nationInput.value
  };
  const config = {
    name: ['empty'],
    director: ['empty'],
    nation: ['empty']
  }
  const validate = validateForm(data, config);

  if (!validate.isValid) {
    showErrorMessage(nameMovieInput, validate.errors.name);
    showErrorMessage(directorInput, validate.errors.director);
    showErrorMessage(nationInput, validate.errors.nation);
    return;
  }

  getApi(`${MOVIES_API}?name=${data.name}`, (movieList) => {
    if (movieList.length === 0) {
      postApi(MOVIES_API, data, () => { renderTable(); });
      hideModal(modalForm);
    } else {
      showErrorMessage(nameMovieInput, MESSAGES.exist);
    }
  });
};

/**
 * Handle update form
 */
const handleUpdateForm = () => {
  const data = {
    name: nameMovieInput.value,
    director: directorInput.value,
    nation: nationInput.value
  };
  const config = {
    name: ['empty'],
    director: ['empty'],
    nation: ['empty']
  }
  const validate = validateForm(data, config);
  const formMovieId = form.getAttribute('data-id');

  if (!validate.isValid) {
    showErrorMessage(nameMovieInput, validate.errors.name);
    showErrorMessage(directorInput, validate.errors.director);
    showErrorMessage(nationInput, validate.errors.nation);
    return;
  }

  getApi(`${MOVIES_API}?name=${data.name}`, (movieList) => {
    if (movieList.length === 0 || movieList[0].id === parseInt(formMovieId, 10)) {
      putApi(`${MOVIES_API}/${formMovieId}`, data, () => { renderTable(); });
      hideModal(modalForm);
    } else {
      showErrorMessage(nameMovieInput, MESSAGES.exist);
    }
  });
};

/**
 * Handle delete movie
 */
const handleDeleteMovie = () => {
  const deleteBtnWarningId = warningDeleteBtn.getAttribute('data-id');

  deleteApi(`${MOVIES_API}/${deleteBtnWarningId}`, () => {
    renderTable();
  });
};

// Popup to add user when clicking on Add button.
addBtn.addEventListener('click', () => {
  form.reset();
  showModal(modalForm);
  hideElement(formUpdateBtn);
  showElement(formCreateBtn);
});

// New movie will be created when clicking create button
formCreateBtn.addEventListener('click', () => {
  handleCreateForm();
});

// Exit modal when clicking cancel button
formCancelBtn.addEventListener('click', () => {
  hideModal(modalForm);
  cleanErrorMessage(nameMovieInput);
  cleanErrorMessage(directorInput);
  cleanErrorMessage(nationInput);
});

// Delete movie from database and table when clicking delete movie button
warningDeleteBtn.addEventListener('click', () => {
  handleDeleteMovie();
  hideModal(modalWarning);
});

// Exit modal movie when clicking cancel button
warningCancelBtn.addEventListener('click', () => {
  hideModal(modalWarning);
});

// Movie will be updated when the update button is clicked
formUpdateBtn.addEventListener('click', () => {
  handleUpdateForm();
  hideModal(modalWarning);
});

// Clicking on the logout button will log out of your account and return to the login page
logoutBtn.addEventListener('click', () => {
  // Remove username from localStorage
  localStorage.removeItem('username');

  // Switch to login page
  window.location.href = loginPage;
});

// Allow return to login page if localStorage has no data
if (!localStorage.getItem('username')) {
  window.location.href = loginPage;
  return;
}

// Display username after successful login
accountName.innerHTML = localStorage.getItem('username');

renderTable();
