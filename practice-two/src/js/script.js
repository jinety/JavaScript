//QUERY TO ID
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const cityInput = document.getElementById('city');
//CHECK THE INPUT CONDITION
const alphabetRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//FIXED VALUE
const notification = {
  emptyFormat: 'Empty format',
  wrongFormat: 'Enter the wrong format. Please re-enter',
  correctFormat: ''
};

const confirmInfo = () => {
  function showErrorMessage(input, msg) {
    const errMessageEl = input.parentElement.querySelector('.warn-msg');
    errMessageEl.innerHTML = msg;
  }

  //FULL NAME IS REQUIRED
  if (fullNameInput.value === '' || fullNameInput.value === undefined || fullNameInput.value === null) {
    showErrorMessage(fullNameInput, notification.emptyFormat);
  } else if (!alphabetRegex.test(fullNameInput.value)) {
    showErrorMessage(fullNameInput, notification.wrongFormat);
  } else {
    showErrorMessage(fullNameInput, notification.correctFormat);
  }
  
  //EMAIL IS REQUIRED
  if (emailInput.value === '' || emailInput.value === undefined || emailInput.value === null) {
    showErrorMessage(emailInput, notification.emptyFormat);
  } else if (!emailRegex.test(emailInput.value)) {
    showErrorMessage(emailInput, notification.wrongFormat)
  } else {
    showErrorMessage(emailInput, notification.correctFormat);
  }

  //SALARY IS REQUIRED AND MUST BE GREATER THAN 0
  if (salaryInput.value === '' || salaryInput.value === undefined || salaryInput.value === null) {
    showErrorMessage(salaryInput, notification.emptyFormat);
  } else if (Math.sign(salaryInput.value) < 0) {
    showErrorMessage(salaryInput, notification.wrongFormat);
  } else {
    showErrorMessage(salaryInput, notification.correctFormat);
  }

  //CITY IS REQUIRED 
  if (cityInput.value === '' || cityInput.value === undefined || cityInput.value === null) {
    showErrorMessage(cityInput, notification.emptyFormat);
  } else if (!alphabetRegex.test(cityInput.value)) {
    showErrorMessage(cityInput, notification.wrongFormat);
  } else {
    showErrorMessage(cityInput, notification.correctFormat);
  }
} 

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', confirmInfo);
