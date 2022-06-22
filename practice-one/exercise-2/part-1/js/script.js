const js_style = () => {
  const changeStyle = document.querySelector ('#text');
  changeStyle.style.fontFamily = 'Arial, sans-serif';
  changeStyle.style.fontSize = '23px';
  changeStyle.style.color = 'red';
};

const btn = document.querySelector('button');
btn.addEventListener('click', js_style);
