const getOptions = () => {
  const colorSelection = document.getElementById('colorList');
  txt = 'No. of items in dropdown is: ';
  const listLength = document.getElementById('colorList').length;

  txt = txt + listLength;
  for(let i = 0; i < colorSelection.length; i++) {
    txt = `${txt} ${colorSelection.options[i].text}`;
  }
  alert(txt);
}

const showButton = document.getElementById('showBtn');
showButton.addEventListener('click', getOptions);
