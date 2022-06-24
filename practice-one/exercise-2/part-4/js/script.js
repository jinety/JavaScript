const getAttributes = () => {
  const attributesHref = document.getElementById('information').href;
  const attributesTarget = document.getElementById('information').target;
  const attributesRel = document.getElementById('information').rel;
  const attributesHreflang = document.getElementById('information').hreflang;
  const attributesType = document.getElementById('information').type;

  alert('designated link: ' + attributesHref);
  alert('designated link: ' + attributesTarget);
  alert('designated link: ' + attributesRel);
  alert('designated link: ' + attributesHreflang);
  alert('designated link: ' + attributesType);
}

const attributGetBtn = document.querySelector('button');
attributGetBtn.addEventListener('click', getAttributes);
