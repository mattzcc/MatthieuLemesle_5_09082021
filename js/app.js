/* var btnNav = document.querySelector('.btn-nav');

var bodyElement = document.getElementById("parent");

// var paragraph = document.getElementById("child");
// bodyElement.removeChild(paragraph);

function textDisappears(){
    bodyElement.remove(bodyElement);
};

var text = btnNav.addEventListener('click', textDisappears); */

/* function presentation(){
    console.log("Hello je suis Matthieu")
}

presentation(); */

// Modify the code here
// ======================
// 'a'
const grid = document.querySelector('.products-grid'); // Selector
console.log(grid); // A retirer
const cardLink = document.createElement('a');
grid.appendChild(cardLink);
cardLink.classList.add('card');
const attrHref = document.createAttribute('href');
cardLink.setAttributeNode(attrHref);
cardLink.setAttribute('href', './pages/product.html');

const imageTeddy = document.getElementsByClassName('card'); // Selector
console.log(imageTeddy) // A retirer

const img = document.createElement('img');
imageTeddy[5].appendChild(img);
img.classList.add('card__img');
const attrAlt = document.createAttribute('alt');
img.setAttributeNode(attrAlt);
img.setAttribute('alt', 'Image d\'un ourson en peluche');
const attrSrc = document.createAttribute('src');
img.setAttributeNode(attrSrc);
img.setAttribute('src', './img/teddy.webp');

const cardButton = document.createElement('div');
cardButton.innerText = 'Voir le produit';
imageTeddy[5].appendChild(cardButton);
cardButton.classList.add('card__button', 'card__button--style');

const cardContent = document.createElement('div');
imageTeddy[5].appendChild(cardContent);
cardContent.classList.add('card__content');

const contentCard = document.querySelectorAll('.card__content'); // Selector
const cardTitle = document.createElement('h2');

contentCard[5].appendChild(cardTitle);
cardTitle.classList.add('card__title');
cardTitle.innerText = 'Matthieu';
console.log(contentCard); // A retirer

const cardPrice = document.createElement('div');
contentCard[5].appendChild(cardPrice);
cardPrice.classList.add('card__price');
cardPrice.innerText = '19.99€';



