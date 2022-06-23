const getAttributes = () => {
  const getHref = document.getElementById('w3r').href;
  alert('designated link: ' + getHref);
  const getTarget = document.getElementById('w3r').target;
  alert('designated link: ' + getTarget);
  const getRel = document.getElementById('w3r').rel;
  alert('designated link: ' + getRel);
  const getHreflang = document.getElementById('w3r').hreflang;
  alert('designated link: ' + getHreflang);
  const getType = document.getElementById('w3r').type;
  alert('designated link: ' + getType);
}

const attributGetButton = document.querySelector('button');
attributGetButton = addEventListener('click', getAttributes);
