// const grid = document.querySelector('.products-grid');
// const cardLink = document.createElement('a');
// grid.appendChild(cardLink);
// cardLink.classList.add('card');
// const attrHref = document.createAttribute('href');
// cardLink.setAttributeNode(attrHref);
// cardLink.setAttribute('href', './pages/product.html');

// const img = document.createElement('img');
// cardLink.appendChild(img);
// img.classList.add('card__img');
// const attrAlt = document.createAttribute('alt');
// img.setAttributeNode(attrAlt);
// img.setAttribute('alt', 'Image d\'un ourson en peluche');
// const attrSrc = document.createAttribute('src');
// img.setAttributeNode(attrSrc);
// img.setAttribute('src', './img/teddy.webp');

// const cardButton = document.createElement('div');
// cardButton.textContent = 'Voir le produit';
// cardLink.appendChild(cardButton);
// cardButton.classList.add('card__button', 'card__button--style');

// const cardContent = document.createElement('div');
// cardLink.appendChild(cardContent);
// cardContent.classList.add('card__content');

// /* const contentCard = document.querySelectorAll('.card__content'); // Selector */
// const cardTitle = document.createElement('h2');

// cardContent.appendChild(cardTitle);
// cardTitle.classList.add('card__title');
// cardTitle.textContent = 'Matthieu';

// const cardPrice = document.createElement('div');
// cardContent.appendChild(cardPrice);
// cardPrice.classList.add('card__price');
// cardPrice.textContent = '19.99€'; //.textcontent à la place de innerText

// fetch

fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(dataTable => {

        for (let i = 0; i < dataTable.length; i++) {
            const dataUrlImg = dataTable[i].imageUrl;
            const dataName = dataTable[i].name;
            let dataPrice = dataTable[i].price;
            let dataId = dataTable[i]._id;
            const grid = document.querySelector('.products-grid');
            const cardLink = document.createElement('a');
            grid.appendChild(cardLink);
            cardLink.classList.add('card');
            const attrHref = document.createAttribute('href');
            cardLink.setAttributeNode(attrHref);
            cardLink.setAttribute('href', './pages/product.html?_id=' + dataId);

            const img = document.createElement('img');
            cardLink.appendChild(img);
            img.classList.add('card__img');
            const attrAlt = document.createAttribute('alt');
            img.setAttributeNode(attrAlt);
            img.setAttribute('alt', 'Image d\'un ourson en peluche');
            const attrSrc = document.createAttribute('src');
            img.setAttributeNode(attrSrc);
            img.setAttribute('src', dataUrlImg);

            const cardButton = document.createElement('div');
            cardButton.textContent = 'Voir le produit';
            cardLink.appendChild(cardButton);
            cardButton.classList.add('card__button', 'card__button--style');

            const cardContent = document.createElement('div');
            cardLink.appendChild(cardContent);
            cardContent.classList.add('card__content');

            const cardTitle = document.createElement('h2');

            cardContent.appendChild(cardTitle);
            cardTitle.classList.add('card__title');
            cardTitle.textContent = dataName;

            const cardPrice = document.createElement('div');
            cardContent.appendChild(cardPrice);
            cardPrice.classList.add('card__price');
            let priceFormat = dataPrice / 100;
            cardPrice.textContent = priceFormat.toFixed([2]) + ' €';
        }
    })
    .catch((err) => {
        const grid = document.querySelector('.products-grid');
        const errMsg = document.createElement('p');
        grid.appendChild(errMsg);
        errMsg.textContent = 'Une erreur s\'est produite lors du chargement des produits'
    });