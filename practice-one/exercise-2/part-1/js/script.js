const stylingParagraphs = () => {
  let info = document.getElementById('text');
  
  info.style.fontFamily = 'Arial, sans-serif';
  info.style.fontSize = '23px';
  info.style.color = 'red';
};

const styleButton = document.querySelector('button');

styleButton.addEventListener('click', stylingParagraphs);
