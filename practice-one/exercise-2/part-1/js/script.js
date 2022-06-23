const getInfo = () => {
  let info = document.getElementById('text');
  info.style.fontFamily = 'Arial, sans-serif';
  info.style.fontSize = '23px';
  info.style.color = 'red';
};

const changeButtonStyle = document.querySelector('button');
changeButtonStyle.addEventListener('click', getInfo);
