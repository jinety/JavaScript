// Query element
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');

//Regex for validating a value/text format
const REGEX = {
  alphabetRegex: /^[a-zA-Z]+ [a-zA-Z]+$/,
  emailRegex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// Message
const MESSAGE = {
  empty: 'Empty format',
  wrongFormat: 'Enter the wrong format. Please re-enter', 
};

const EmptyText = {
  correct: ''
};

/**
 * Display error message when user enters wrong input
 * 
 * @param {string} input Query to element
 * @param {string} msg Show message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');
  errMessageEl.innerHTML = msg;
}

/**
 * Check for empty, null, undefined
 * 
 * @param {string} value 
 */
const isEmpty = (value) => {
  if(!value) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check input only letters without numbers
 * 
 * @param {string} input Input value
 */
const isValidAlphabet = (input) => {
  if (!REGEX.alphabetRegex.test(input.value)) {
    return true;
  }
    
  return false;
}

/**
 * Check the format of the email
 * 
 * @param {string} input Input value
 */
const isValidEmail = (input) => {
  if (!REGEX.emailRegex.test(input.value)) {
    return true;
  }

  return false;
}


/**
 * Check salary less than or equal to 0
 * 
 * @param {number} input Input value
 */
const isValidSalary = (input) => {
  if (input.value <= 0) {
    return true;
  } 

  return false;
}

/**
 * Validate form data
 */
const validateForm = () => {
  //Full name is required
  if (isEmpty(fullNameInput.value)) {
    showErrorMessage(fullNameInput, MESSAGE.empty);
  } else if (isValidAlphabet(fullNameInput)) {
    // Full name can't have number
    showErrorMessage(fullNameInput, MESSAGE.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, EmptyText.correct);
  }
  
  //Email is required
  if (isEmpty(emailInput.value)) {
    showErrorMessage(emailInput, MESSAGE.empty);
  } else if (isValidEmail(emailInput)) {
    // Email must be in the correct format
    showErrorMessage(emailInput, MESSAGE.wrongFormat)
  } else {
    showErrorMessage(emailInput, EmptyText.correct);
  }

  //Salary is required
  if (isEmpty(salaryInput.value)) {
    showErrorMessage(salaryInput, MESSAGE.empty);
  } else if (isValidSalary(salaryInput)) {
    // Must be greater than 0
    showErrorMessage(salaryInput, MESSAGE.wrongFormat);
  } else {
    showErrorMessage(salaryInput, EmptyText.correct);
  }

  //City is required
  if (isEmpty(cityInput.value)) {
    showErrorMessage(cityInput, MESSAGE.empty);
  } else if (isValidAlphabet(cityInput)) {
    // City names can't have numbers
    showErrorMessage(cityInput, MESSAGE.wrongFormat);
  } else {
    showErrorMessage(cityInput, EmptyText.correct);
  }
} 

/**
 * Submit form
 */
const submitForm = () => {
  //Validate form data
  validateForm();
}
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', submitForm);
