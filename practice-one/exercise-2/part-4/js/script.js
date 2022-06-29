const getAttributes = () => {
  const attributes = document.getElementById('information');
 
  alert(`href: ${attributes.href}`);
  alert(`target: ${attributes.target}`);
  alert(`rel: ${attributes.rel}`);
  alert(`hreflang: ${attributes.hreflang}`);
  alert(`type: ${attributes.type}`);
}

const getAttributeBtn = document.querySelector('.attributes-btn');

getAttributeBtn.addEventListener('click', getAttributes);
