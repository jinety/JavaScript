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
  empty: 'Value should be not empty',
  wrongFormat: 'Enter the wrong format. Please re-enter', 
};

const EmptyText = '';

/**
 * Display error message when user enters wrong input
 * 
 * @param {HtmlInputElement} input - Input element
 * @param {string} msg - Show message
 */
const showErrorMessage = (input, msg) => {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');
  errMessageEl.innerHTML = msg;
}

/**
 * Check empty
 * 
 * @param {string} value - Comparative value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  } 

  return false;
}

/**
 * Invalid alphabet check
 * 
 * @param {string} value - Comparative value
 */
const isInvalidAlphabet = (value) => {
  if (!REGEX.alphabetRegex.test(value)) {
    return true;
  }
    
  return false;
}

/**
 * Check email is not valid
 * 
 * @param {string} value - Comparative value
 */
const isInvalidEmail = (value) => {
  if (!REGEX.emailRegex.test(value)) {
    return true;
  }

  return false;
}


/**
 * Check salary less than or equal to 0
 * 
 * @param {number} value - Salary value
 */
const isInvalidSalary = (value) => {
  if (value <= 0) {
    return true;
  } 

  return false;
}

/**
 * Validate form data
 */
const validateForm = () => {
  const nameValue = fullNameInput.value;
  const emailValue = emailInput.value;
  const salaryValue = salaryInput.value;
  const cityValue = cityInput.value;

  // Full name is required
  if (isEmpty(nameValue)) {
    showErrorMessage(fullNameInput, MESSAGES.empty);
  } else if (isInvalidAlphabet(nameValue)) {
    // Fullname is not in the correct format
    showErrorMessage(fullNameInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, EmptyText);
  }
  
  // Email is required
  if (isEmpty(emailValue)) {
    showErrorMessage(emailInput, MESSAGES.empty);
  } else if (isInvalidEmail(emailValue)) {
    // Email is not in the correct format
    showErrorMessage(emailInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(emailInput, EmptyText);
  }

  // Salary is required
  if (isEmpty(salaryValue)) {
    showErrorMessage(salaryInput, MESSAGES.empty);
  } else if (isInvalidSalary(salaryValue)) {
    // Salary less than or equal to 0
    showErrorMessage(salaryInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(salaryInput, EmptyText);
  }

  // City is required
  if (isEmpty(cityValue)) {
    showErrorMessage(cityInput, MESSAGES.empty);
  } else if (isInvalidAlphabet(cityValue)) {
    // City name is not in the correct format
    showErrorMessage(cityInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(cityInput, EmptyText);
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
