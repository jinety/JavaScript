const getOptions = () => {
  const colorSelection = document.getElementById('mySelect');
  let txt = 'No. of items in dropdown is: ';
  let list = document.getElementById('mySelect').length;
  txt = txt + list;
  for(let i = 0; i < colorSelection.length; i++) {
    txt = txt + '\n' + colorSelection.options[i].text;
  }
  alert(txt);
}

const countAndDisplayItemsBtn = document.getElementById('countAndDisplayItemsBtn');
countAndDisplayItemsBtn.addEventListener('click', getOptions);
