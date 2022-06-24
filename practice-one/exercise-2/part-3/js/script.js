const setBackground = () => {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    paragraph.style.background = 'green';
  })
};

const styleBtn = document.querySelector('input');
styleBtn = addEventListener('click', setBackground);
