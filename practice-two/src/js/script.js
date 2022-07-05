// Query to id
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');

// Check the input condition
const REGEX = {
  alphabetRegex: /^[a-zA-Z]+ [a-zA-Z]+$/,
  emailRegex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// Fixed value
const MESSAGE = {
  empty: 'Empty format',
  wrongFormat: 'Enter the wrong format. Please re-enter', 
};

const GENERAL = {
  correct: ''
};

function showErrorMessage(input, msg) {
  const errMessageEl = input.parentElement.querySelector('.warn-msg');
  errMessageEl.innerHTML = msg;
}

function isEmpty (input) {
  if(!input.value) {
    return true;
  } else {
    return false;
  }
}

function isValidAlphabet(input) {
  if (!REGEX.alphabetRegex.test(input.value)) {
    return true;
  } else {
    return false;
  }
}

function isValidEmail(input) {
  if (!REGEX.emailRegex.test(input.value)) {
    return true;
  } else {
    return false;
  }
}

function isValidSalary(input) {
  if (input.value <= 0) {
    return true;
  } else {
    return false;
  }
}

const validateForm = () => {

  // Full name is required
  if (isEmpty(fullNameInput)) {
    showErrorMessage(fullNameInput, MESSAGE.empty);
  } else if (isValidAlphabet(fullNameInput)) {
    showErrorMessage(fullNameInput, MESSAGE.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, GENERAL.correct);
  }
  
  // Email is required
  if (isEmpty(emailInput)) {
    showErrorMessage(emailInput, MESSAGE.empty);
  } else if (isValidEmail(emailInput)) {
    showErrorMessage(emailInput, MESSAGE.wrongFormat)
  } else {
    showErrorMessage(emailInput, GENERAL.correct);
  }

  // Salary is required
  if (isEmpty(salaryInput)) {
    showErrorMessage(salaryInput, MESSAGE.empty);
  } else if (isValidSalary(salaryInput)) {
    // Must be greater than 0

    showErrorMessage(salaryInput, MESSAGE.wrongFormat);
  } else {
    showErrorMessage(salaryInput, GENERAL.correct);
  }

  // City is required 
  if (isEmpty(cityInput)) {
    showErrorMessage(cityInput, MESSAGE.empty);
  } else if (isValidAlphabet(cityInput)) {
    showErrorMessage(cityInput, MESSAGE.wrongFormat);
  } else {
    showErrorMessage(cityInput, GENERAL.correct);
  }
} 

function submitForm() {

  // Validate form data
  validateForm();
}
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', submitForm);
