const nameMovieInput = document.getElementById('nameMovie');
const directorInput = document.getElementById('director');
const nationInput = document.getElementById('nation');
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

/**
*  Checks for an empty value
*/
const isEmpty = (value) => (!value);

export default function isValidForm() {
  const nameMovie = nameMovieInput.value;
  const director = directorInput.value;
  const nation = nationInput.value;
  let isValid = false;

  if (isEmpty(nameMovie)) {
    showErrorMessage(nameMovieInput, MESSAGES.empty);
  } else {
    isValid = true;
    showErrorMessage(nameMovieInput, EmptyText);
  }

  if (isEmpty(director)) {
    showErrorMessage(directorInput, MESSAGES.empty);
  } else {
    isValid = true;
    showErrorMessage(directorInput, EmptyText);
  }

  if (isEmpty(nation)) {
    showErrorMessage(nationInput, MESSAGES.empty);
  } else {
    isValid = true;
    showErrorMessage(nationInput, EmptyText);
  }

  return isValid;
}
