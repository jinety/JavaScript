const setBackground = () => {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    paragraph.style.background = 'green';
  })
};

const textColorChangeButton = document.querySelector('input');
textColorChangeButton = addEventListener('click', setBackground);
