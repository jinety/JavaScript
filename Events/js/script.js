const a = document.querySelector('.demo');
const btn = document.querySelector('.btn');
const deleteBtn = document.querySelector('.delete-btn')
// distance 1
const changeContent = () => {
  a.innerHTML = 'Hello World';
  a.style.color = 'blue';
  a.style.fontSize = '24px';
}

const alertText = () => {
  alert('successful');
}

btn.addEventListener('click', changeContent);
btn.addEventListener('click', alertText);

// distance 2
// btn.addEventListener('click', function() {
//   a.innerHTML = 'Hello World';
//   a.style.color = 'blue';
//   a.style.fontSize = '24px';
// })
