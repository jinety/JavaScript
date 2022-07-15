// Query elements
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submitBtn');

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

// Name of the key in localStorage
const UsersKey = 'users';

// Parse any JSON previously stored in users
let userDatabase = JSON.parse(localStorage.getItem(UsersKey));
 
// If existingEntries is null, array will be created
if (userDatabase === null) {
  userDatabase = [];
}

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
 * Function to save data to localStorage
 * 
 */
const saveData = () => {
  // Append values ​​to array 
  userDatabase.push({
    fullName: fullNameInput.value,
    email: emailInput.value,
    salary: salaryInput.value,
    city: cityInput.value
  });

  localStorage.setItem(UsersKey, JSON.stringify(userDatabase));
}

/**
 * Show user data in table
 */
const renderUserTable = () => {
  let tableTemplate = '';

  userDatabase.forEach((element, index) => {
    tableTemplate += ` 
      <tr class="content-row">
        <td>${element.fullName}</td>
        <td>${element.email}</td>
        <td>${element.salary}</td>
        <td>${element.city}</td>
        <td class="td-btn">
          <button type="button" class="delete-button" data-columns=${index}>Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById('userTableBody').innerHTML = tableTemplate;
  const deleteButtons = document.querySelectorAll('.delete-button');

  // Delete data from table and localStorage
  deleteButtons.forEach(item => {
    item.addEventListener('click', function() {
      if (confirm('Are you sure?')) {
        item.parentElement.parentElement.remove();
        userDatabase.splice(item.dataset.columns, 1);
        localStorage.setItem(UsersKey, JSON.stringify(userDatabase))
      }
    });
  });
}

/**
 * Submit form
 */
const submitForm = () => {
  // Validate form data
  if (isValidForm()) {
    // Save form data
    saveData();
    renderUserTable();
  }
}

submitBtn.addEventListener('click', submitForm);
renderUserTable();
