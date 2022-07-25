// Query elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submitBtn');
const userTableBody = document.getElementById('userTableBody')
let courseApi = 'http://localhost:3000/userDatabase'

// Regex for validating a value/text format
const REGEX = {
  alphabetShortRegex: /^[A-Za-z\s]+$/,
  emailRegex: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// Messages
const MESSAGES = {
  empty: 'Value should be not empty',
  wrongFormat: 'Enter the wrong format. Please re-enter'
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
 * Function that checks for an empty value
 * 
 * @param {string} value - Comparative value
 */
const isEmpty = (value) => {
  if (!value) {
    return true;
  } 

  return false;
}

const isInvalidName = (value) => {
  if (!REGEX.alphabetShortRegex.test(value)) {
    return true;
  }

  return false;
}

/**
 * Email check function is not valid
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
const isValidForm = () => {
  const nameValue = fullNameInput.value;
  const emailValue = emailInput.value;
  const salaryValue = salaryInput.value;
  const cityValue = cityInput.value;
  let isValid = true;

  // Full name is required
  if (isEmpty(nameValue)) {
    isValid = false;
    showErrorMessage(fullNameInput, MESSAGES.empty);
  } else if (isInvalidName(nameValue)) {
    // Full name is not in the correct format
    isValid = false;
    showErrorMessage(fullNameInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, EmptyText);
  }
  
  // Email is required
  if (isEmpty(emailValue)) {
    isValid = false;
    showErrorMessage(emailInput, MESSAGES.empty);
  } else if (isInvalidEmail(emailValue)) {
    // Email is not in the correct format
    isValid = false;
    showErrorMessage(emailInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(emailInput, EmptyText);
  }

  // Salary is required
  if (isEmpty(salaryValue)) {
    isValid = false;
    showErrorMessage(salaryInput, MESSAGES.empty);
  } else if (isInvalidSalary(salaryValue)) {
    // Salary less than or equal to 0
    isValid = false;
    showErrorMessage(salaryInput, MESSAGES.wrongFormat);
  } else {
    showErrorMessage(salaryInput, EmptyText);
  }

  // City is required
  if (isEmpty(cityValue)) {
    isValid = false;
    showErrorMessage(cityInput, MESSAGES.empty);
  } else if (isInvalidName(cityValue)) {
    // City name is not in the correct format
    isValid = false;
    showErrorMessage(cityInput, MESSAGES.wrongFormat);
  } else {
    // City name in correct format
    showErrorMessage(cityInput, EmptyText);
  }

  return isValid;
}

/**
 * Function POST data to userDatabase 
 */
const createUsers = (data, callback) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  fetch(courseApi, options)
    .then(function(response) {
      response.json();
    })
    .then(callback);
}

const handleCreateForm = () => {
  const name = fullNameInput.value;
  const email = emailInput.value;
  const salary = salaryInput.value;
  const city = cityInput.value;
  const formData = {
    name: name,
    email: email,
    salary: salary,
    city: city
  };

  createUsers(formData);
}

const submitForm = () => {
  if (isValidForm()) {
    handleCreateForm();
  }
}

submitBtn.addEventListener('click', submitForm);
