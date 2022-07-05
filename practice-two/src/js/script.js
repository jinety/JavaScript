// Query elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');

// Regex for validating a value/text format
const REGEX = {
  alphabetRegex: /^[a-zA-Z]+ [a-zA-Z]+$/,
  emailRegex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// Messages
const MESSAGES = {
  empty: 'Empty format',
  wrongFormat: 'Enter the wrong format. Please re-enter', 
};

const EMPTYTEXT = {
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
 * @param {string} value Comparative value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check input only letters without number
 * 
 * @param {string} value Comparative value
 */
const isValidAlphabet = (value) => {
  if (!REGEX.alphabetRegex.test(value)) {
    return true;
  }
    
  return false;
}

/**
 * Check the format of the email
 * 
 * @param {string} value Comparative value
 */
const isValidEmail = (value) => {
  if (!REGEX.emailRegex.test(value)) {
    return true;
  }

  return false;
}


/**
 * Check salary less than or equal to 0
 * 
 * @param {number} value Comparative value
 */
const isValidSalary = (value) => {
  if (value <= 0) {
    return true;
  } 

  return false;
}

/**
 * Validate form data
 */
const validateForm = () => {
  // Full name is required
  if (isEmpty(fullNameInput.value)) {
    showErrorMessage(fullNameInput, MESSAGES.empty);
  } else if (isValidAlphabet(fullNameInput.value)) {
    // Full name can't have number
    showErrorMessage(fullNameInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, EMPTYTEXT.correct);
  }
  
  // Email is required
  if (isEmpty(emailInput.value)) {
    showErrorMessage(emailInput, MESSAGES.empty);
  } else if (isValidEmail(emailInput.value)) {
    // Email must be in the correct format
    showErrorMessage(emailInput, MESSAGES.wrongFormat)
  } else {
    showErrorMessage(emailInput, EMPTYTEXT.correct);
  }

  // Salary is required
  if (isEmpty(salaryInput.value)) {
    showErrorMessage(salaryInput, MESSAGES.empty);
  } else if (isValidSalary(salaryInput.value)) {
    // Must be greater than 0
    showErrorMessage(salaryInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(salaryInput, EMPTYTEXT.correct);
  }

  // City is required
  if (isEmpty(cityInput.value)) {
    showErrorMessage(cityInput, MESSAGES.empty);
  } else if (isValidAlphabet(cityInput.value)) {
    // City names can't have number
    showErrorMessage(cityInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(cityInput, EMPTYTEXT.correct);
  }
} 

/**
 * Submit form
 */
const submitForm = () => {
  // Validate form data
  validateForm();
}
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', submitForm);
