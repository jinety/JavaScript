const getAttributes = () => {
  const attributes = document.getElementById('information');
  const href = attributes.href
  const target = attributes.target
  const rel = attributes.rel
  const hreflang = attributes.hreflang
  const type = attributes.type

  alert('href: ' + href);
  alert('target: ' + target);
  alert('rel: ' + rel);
  alert('hreflang: ' + hreflang);
  alert('type: ' + type);
}

const attributeGetBtn = document.querySelector('button');
attributeGetBtn.addEventListener('click', getAttributes);
