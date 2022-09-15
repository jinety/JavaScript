import { formValidate } from '../validates/form.validate';
import { apiService } from '../service/api.service';
import { DocumentHelper } from '../helpers/document.helper';
import { ModalHelper } from '../helpers/modal.helper';
import { MovieTemplate } from '../templates/movie.template';
import { MOVIES_API } from '../constants/url-api.constant';
import { MESSAGES } from '../constants/message.constant';
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
    this.handleUserLogout();
    this.handleLayoutMainAddBtn();
    this.handleModalFormCreateBtn();
    this.handleModalFormCancelBtn();
    this.handleModalFormUpdateBtn();
    this.handleRenderTable();
  }

  resetForm() {
    this.form.reset();
    DocumentHelper.cleanErrorMessage(this.nameMovieInput);
    DocumentHelper.cleanErrorMessage(this.directorInput);
    DocumentHelper.cleanErrorMessage(this.nationInput);
  }

  /**
   * Modal form update will appear when clicking the update button in the table
   *
   * @param {element} item - Table update button
   */
  // async tableUpdateBtn(item) {
  //   const movieId = item.dataset.id;

  //   ModalHelper.showModal(this.modalForm);
  //   const movieData = await apiService.get(`${MOVIES_API}/${movieId}`);

  //   this.nameMovieInput.value = movieData.name;
  //   this.directorInput.value = movieData.director;
  //   this.nationInput.value = movieData.nation;
  //   this.form.setAttribute('data-id', movieId);
  // }

  async tableUpdateBtn(item) {
    const movieId = item.dataset.id;

    ModalHelper.showModal(this.modalForm);
    const movieData = await apiService.get(`${MOVIES_API}/${movieId}`);
    this.nameMovieInput.value = movieData.name;
    this.directorInput.value = movieData.director;
    this.nationInput.value = movieData.nation;
    this.form.setAttribute('data-id', movieId);
  }

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

  // handleTableUpdateButtons() {
  //   MovieTemplate.test().forEach((item) => {
  //     item.addEventListener('click', async () => {
  //       await this.tableUpdateBtn(item);
  //       DocumentHelper.hideElement(this.modalFormCreateBtn);
  //       DocumentHelper.showElement(this.modalFormUpdateBtn);
  //     });
  //   });
  // }

  /**
   * Handling getting data from the API and displaying it on a table in HTML
   */
  async handleRenderTable() {
    try {
      const result = await apiService.get(MOVIES_API);
      let tableTemplate = '';

      result.forEach((movie) => {
        tableTemplate += MovieTemplate.renderTableRow(movie);
      });

      this.tableBody.innerHTML = tableTemplate;
      const updateButtons = document.querySelectorAll('.table .table-update-btn');
      updateButtons.forEach((item) => {
        item.addEventListener('click', async () => {
          await this.tableUpdateBtn(item);
          DocumentHelper.hideElement(this.modalFormCreateBtn);
          DocumentHelper.showElement(this.modalFormUpdateBtn);
        });
      });
    } catch (error) {
      alert('An error occurred while getting movie', error);
    }
  }

  /**
   * Handling create form  by calling API
   */
  async handleCreateForm() {
    try {
      const data = {
        name: this.nameMovieInput.value,
        director: this.directorInput.value,
        nation: this.nationInput.value,
      };
      const config = {
        name: ['empty'],
        director: ['empty'],
        nation: ['empty'],
      };
      const validate = formValidate.validateForm(data, config);

      if (!validate.isValid) {
        DocumentHelper.showErrorMessage(this.nameMovieInput, validate.errors.name);
        DocumentHelper.showErrorMessage(this.directorInput, validate.errors.director);
        DocumentHelper.showErrorMessage(this.nationInput, validate.errors.nation);

        return;
      }

      const movieList = await apiService.get(`${MOVIES_API}?name=${data.name}`);

      if (movieList.length === 0) {
        const newMovie = await apiService.post(MOVIES_API, data);
        const newRow = this.tableBody.insertRow();

        newRow.innerHTML = MovieTemplate.renderTableRow(newMovie);

        ModalHelper.hideModal(this.modalForm);
      } else {
        DocumentHelper.showErrorMessage(this.nameMovieInput, MESSAGES.exist);
      }
    } catch (error) {
      alert('An error occurred while creating a new movie', error);
    }
  }

  /**
   * Handle update form
   */
  async handleUpdateForm() {
    try {
      const data = {
        name: this.nameMovieInput.value,
        director: this.directorInput.value,
        nation: this.nationInput.value,
      };
      const config = {
        name: ['empty'],
        director: ['empty'],
        nation: ['empty'],
      };
      const validate = formValidate.validateForm(data, config);
      const formMovieId = this.form.getAttribute('data-id');

      if (!validate.isValid) {
        DocumentHelper.showErrorMessage(this.nameMovieInput, validate.errors.name);
        DocumentHelper.showErrorMessage(this.directorInput, validate.errors.director);
        DocumentHelper.showErrorMessage(this.nationInput, validate.errors.nation);

        return;
      }

      const movieList = await apiService.get(`${MOVIES_API}?name=${data.name}`);
      const moviesDoNotExist = movieList.length === 0
        || movieList[0].id === parseInt(formMovieId, 10);

      if (moviesDoNotExist) {
        await apiService.put(`${MOVIES_API}/${formMovieId}`, data);
        await this.handleRenderTable();
        ModalHelper.hideModal(this.modalForm);
      } else {
        DocumentHelper.showErrorMessage(this.nameMovieInput, MESSAGES.exist);
      }
    } catch (error) {
      alert('Something went wrong while updating the movie', error);
    }
  }

  // /**
  //  * Handle delete movie
  //  */
  // handleDeleteMovie() {
  //   const deleteBtnWarningId = modalWarningDeleteBtn.getAttribute('data-id');

  //   deleteApi(`${MOVIES_API}/${deleteBtnWarningId}`, () => {
  //     renderTable();
  //   });
  // }

  /**
   * Handle modal appearance when user clicks add button
   */
  handleLayoutMainAddBtn() {
    // Popup to add user when clicking on Add button.
    this.layoutMainAddBtn.addEventListener('click', () => {
      ModalHelper.showModal(this.modalForm);
      DocumentHelper.hideElement(this.modalFormUpdateBtn);
      DocumentHelper.showElement(this.modalFormCreateBtn);
    });
  }

  /**
   * Handle creating new movie when user clicks create movie button
   */
  handleModalFormCreateBtn() {
    // New movie will be created when clicking create button
    this.modalFormCreateBtn.addEventListener('click', async () => {
      await this.handleCreateForm();
    });
  }

  /**
   * Handle modal exit when user clicks cancel button
   */
  handleModalFormCancelBtn() {
    // Exit modal when clicking cancel button
    this.modalFormCancelBtn.addEventListener('click', () => {
      ModalHelper.hideModal(this.modalForm);
      this.resetForm();
    });
  }

  // // Delete movie from database and table when clicking delete movie button
  // modalWarningDeleteBtn.addEventListener('click', () => {
  //   handleDeleteMovie();
  //   hideModal(modalWarning);
  // });

  // // Exit modal movie when clicking cancel button
  // modalWarningCancelBtn.addEventListener('click', () => {
  //   hideModal(modalWarning);
  // });

  handleModalFormUpdateBtn() {
    // Movie will be updated when the update button is clicked
    this.modalFormUpdateBtn.addEventListener('click', async () => {
      await this.handleUpdateForm();
      ModalHelper.hideModal(this.modalWarning);
    });
  }

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
