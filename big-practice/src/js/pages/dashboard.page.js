import { formValidate } from '../validates/form.validate';
import { apiService } from '../service/api.service';
import { DocumentHelper } from '../helpers/document.helper';
import { ModalHelper } from '../helpers/modal.helper';
import { MovieTemplate } from '../templates/movie.template';
import { MOVIES_API } from '../constants/url-api.constant';
import { EMPTY_TEXT, MESSAGES } from '../constants/message.constant';
import { USERNAME_KEY, LOGIN_PAGE } from '../constants/app.constant';

class Dashboard {
  // Query elements
  tableBody = document.getElementById('tableBody');
  nameMovieInput = document.getElementById('nameMovie');
  directorInput = document.getElementById('director');
  nationInput = document.getElementById('nation');
  accountName = document.querySelector('.account-name');
  form = document.querySelector('.form');
  modalForm = document.querySelector('.modal-form');
  modalWarning = document.querySelector('.modal-warning');
  layoutMainAddBtn = document.querySelector('.layout-main .add-btn');
  modalFormCreateBtn = document.querySelector('.modal-form .create-btn');
  modalFormUpdateBtn = document.querySelector('.modal-form .update-btn');
  modalFormCancelBtn = document.querySelector('.modal-form .cancel-btn');
  modalWarningCancelBtn = document.querySelector('.modal-warning .cancel-btn');
  modalWarningDeleteBtn = document.querySelector('.modal-warning .delete-btn');
  logoutBtn = document.querySelector('.site-header .logout-btn');

  constructor() {
    this.checkUserLogin();
    this.showUserName();
    this.handleRenderTable();
    this.handleUserLogout();
  }

  // /**
  //  * Modal form update will appear when clicking the update button in the table
  //  *
  //  * @param {element} item - Table update button
  //  */
  // tableUpdateBtn(item) {
  //   const movieId = item.dataset.id;

  //   showModal(modalForm);
  //   getApi(`${MOVIES_API}/${movieId}`, (movieData) => {
  //     nameMovieInput.value = movieData.name;
  //     directorInput.value = movieData.director;
  //     nationInput.value = movieData.nation;
  //     form.setAttribute('data-id', movieId);
  //   });
  // }

  // /**
  //  * Modal warning will appear when clicking delete button in the table
  //  *
  //  * @param {element} item - Table delete button
  //  */
  // tableDeleteBtn(item) {
  //   const movieId = item.dataset.id;

  //   showModal(modalWarning);
  //   modalWarningDeleteBtn.setAttribute('data-id', movieId);
  // }

  /**
   * Handling getting data from the API and displaying it on a table in HTML
   */
  async handleRenderTable() {
    try {
      const result = await apiService.get(MOVIES_API);
      let tableTemplate = '';

      result.forEach((movie) => {
        tableTemplate += MovieTemplate.renderTable(movie);
      });

      this.tableBody.innerHTML = tableTemplate;
    } catch (error) {
      alert('An error occurred while getting movie', error);
    }
  }

  // /**
  //  * Handle create form
  //  */
  // handleCreateForm() {
  //   const data = {
  //     name: nameMovieInput.value,
  //     director: directorInput.value,
  //     nation: nationInput.value,
  //   };
  //   const config = {
  //     name: ['empty'],
  //     director: ['empty'],
  //     nation: ['empty'],
  //   };
  //   const validate = Validation.validateForm(data, config);

  //   if (!validate.isValid) {
  //     showErrorMessage(nameMovieInput, validate.errors.name);
  //     showErrorMessage(directorInput, validate.errors.director);
  //     showErrorMessage(nationInput, validate.errors.nation);
  //     return;
  //   }

  //   getApi(`${MOVIES_API}?name=${data.name}`, (movieList) => {
  //     if (movieList.length === 0) {
  //       postApi(MOVIES_API, data, () => { renderTable(); });
  //       hideModal(modalForm);
  //     } else {
  //       showErrorMessage(nameMovieInput, MESSAGES.exist);
  //     }
  //   });
  // }

  // /**
  //  * Handle update form
  //  */
  // handleUpdateForm() {
  //   const data = {
  //     name: nameMovieInput.value,
  //     director: directorInput.value,
  //     nation: nationInput.value,
  //   };
  //   const config = {
  //     name: ['empty'],
  //     director: ['empty'],
  //     nation: ['empty'],
  //   };
  //   const validate = validateForm(data, config);
  //   const formMovieId = form.getAttribute('data-id');

  //   if (!validate.isValid) {
  //     showErrorMessage(nameMovieInput, validate.errors.name);
  //     showErrorMessage(directorInput, validate.errors.director);
  //     showErrorMessage(nationInput, validate.errors.nation);
  //     return;
  //   }

  //   getApi(`${MOVIES_API}?name=${data.name}`, (movieList) => {
  //     const moviesDoNotExist = movieList.length === 0 || movieList[0].id === parseInt(formMovieId, 10);

  //     if (moviesDoNotExist) {
  //       putApi(`${MOVIES_API}/${formMovieId}`, data, () => { renderTable(); });
  //       hideModal(modalForm);
  //     } else {
  //       showErrorMessage(nameMovieInput, MESSAGES.exist);
  //     }
  //   });
  // }

  // /**
  //  * Handle delete movie
  //  */
  // handleDeleteMovie() {
  //   const deleteBtnWarningId = modalWarningDeleteBtn.getAttribute('data-id');

  //   deleteApi(`${MOVIES_API}/${deleteBtnWarningId}`, () => {
  //     renderTable();
  //   });
  // }

  // // Popup to add user when clicking on Add button.
  // this.layoutMainAddBtn.addEventListener('click', () => {
  //   form.reset();
  //   showModal(modalForm);
  //   hideElement(modalFormUpdateBtn);
  //   showElement(modalFormCreateBtn);
  // });

  // New movie will be created when clicking create button
  // modalFormCreateBtn.addEventListener('click', () => {
  //   handleCreateForm();
  // });

  // // Exit modal when clicking cancel button
  // modalFormCancelBtn.addEventListener('click', () => {
  //   hideModal(modalForm);
  //   cleanErrorMessage(nameMovieInput);
  //   cleanErrorMessage(directorInput);
  //   cleanErrorMessage(nationInput);
  // });

  // // Delete movie from database and table when clicking delete movie button
  // modalWarningDeleteBtn.addEventListener('click', () => {
  //   handleDeleteMovie();
  //   hideModal(modalWarning);
  // });

  // // Exit modal movie when clicking cancel button
  // modalWarningCancelBtn.addEventListener('click', () => {
  //   hideModal(modalWarning);
  // });

  // // Movie will be updated when the update button is clicked
  // modalFormUpdateBtn.addEventListener('click', () => {
  //   handleUpdateForm();
  //   hideModal(modalWarning);
  // });

  /**
   * Handle user logout when user clicks logout button
   */
  handleUserLogout() {
    // Clicking on the logout button will log out of your account and return to the login page
    this.logoutBtn.addEventListener('click', () => {
      // Remove username from localStorage
      localStorage.removeItem('username');

      // Switch to login page
      window.location.href = LOGIN_PAGE;
    });
  }

  /**
   * Check if logged in user information is in localStorage
   */
  checkUserLogin() {
    // Allow return to login page if localStorage has no data
    if (!localStorage.getItem(USERNAME_KEY)) {
      window.location.href = LOGIN_PAGE;
    }
  }

  /**
   * Display username after successful login
   */
  showUserName() {
    this.accountName.innerHTML = localStorage.getItem('username');
  }
}

const dashboardPage = new Dashboard();
