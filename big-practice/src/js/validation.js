import { EmptyText, MESSAGES } from './text';

// Query elements
const nameMovieInput = document.getElementById('nameMovie');
const directorInput = document.getElementById('director');
const nationInput = document.getElementById('nation');

/**
 *  Display error message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');

  errMessageEl.innerHTML = msg;
};

/**
*  Checks for an empty value
*/
const isEmpty = (value) => (!value);

export default function isValidForm() {
  const nameMovie = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  let isValid = false;

  // Movie title cannot be blank
  if (isEmpty(nameMovie)) {
    showErrorMessage(nameMovieInput, MESSAGES.empty);
  } else {
    isValid = true;
    showErrorMessage(nameMovieInput, EmptyText);
  }

  // Director cannot be blank
  if (isEmpty(director)) {
    showErrorMessage(directorInput, MESSAGES.empty);
  } else {
    isValid = true;
    showErrorMessage(directorInput, EmptyText);
  }

  // Nation cannot be blank
  if (isEmpty(nation)) {
    showErrorMessage(nationInput, MESSAGES.empty);
  } else {
    isValid = true;
    showErrorMessage(nationInput, EmptyText);
  }

  return isValid;
}

export { isEmpty };
