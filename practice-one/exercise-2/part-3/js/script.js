const setBackground = () => {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    paragraph.style.backgroundColor = 'green';
  })
};

const styleBtn = document.querySelector('button');
styleBtn.addEventListener('click', setBackground);
