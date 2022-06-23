// Change the body style so it has a font-family of "Arial, sans-serif".
document.body.style.fontFamily = 'Arial, sans-serif';

// Replace each of the spans (nickname, favorites, hometown) with your own information
const nickName = document.querySelector('#nickname');
nickName.textContent = 'Nguyen Van Hoa';
const interests = document.querySelector('#favorites');
interests.textContent = 'e-sport';
const homeTown = document.querySelector('#hometown');
homeTown.textContent = 'Quang Nam';

// Iterate through each li and change the class to "listitem". 
// Add a style tag that sets a rule for "listitem" to make the color red.
const getElement = document.querySelectorAll('li');
  getElement.forEach(applyClass  => {
  applyClass.className = 'listitem';
})
const changeColor = document.querySelectorAll('.listitem')
changeColor.forEach(applyColor => {
  applyColor.style.color = 'red';
})

//Create a new img element and set its src attribute to a picture of you. 
//Append that element to the page.
const img = document.createElement('img');
img.setAttribute('src', 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/83742245_2744045389149014_7481861951941771264_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=fNywBuQfMq8AX-ASprh&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT_hL-Bhkcssa9IRuvHK2skZ8lfYO61TtuFBTxeODdGGNg&oe=62D92BF5');
document.body.appendChild(img);
