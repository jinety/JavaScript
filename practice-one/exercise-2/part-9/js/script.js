const getOptions = () => {
  const colorSelection = document.getElementById('colorList');
  txt = 'No. of items in dropdown is: ';
  let colorList = document.getElementById('colorList').length;
  txt = txt + colorList;
  for(let i = 0; i < colorSelection.length; i++) {
    txt = `${txt}
    ${colorSelection.options[i].text}`;
  }
  alert(txt);
}

const countAndDisplayBtn = document.getElementById('countAndDisplayBtn');
countAndDisplayBtn.addEventListener('click', getOptions);
