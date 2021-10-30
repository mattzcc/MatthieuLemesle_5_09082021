// Appel à l'API pour récupérer les données de tous les produits //
fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(dataTable => {

        // Boucle pour itérer sur les arrays afin de récupérer les données de chacun des produits
        for (let i = 0; i < dataTable.length; i++) {

            const dataUrlImg = dataTable[i].imageUrl;
            const dataName = dataTable[i].name;
            const dataPrice = dataTable[i].price;
            const dataId = dataTable[i]._id;

            // Création du HTML en y insérant les valeurs des produits
            const grid = document.querySelector('.products-grid');
            const cardLink = document.createElement('a');
            grid.appendChild(cardLink);
            cardLink.classList.add('card');
            const attrHref = document.createAttribute('href');
            cardLink.setAttributeNode(attrHref);
            // Attribution d'une URL unique à chacun des produits qui inclut leur ID
            cardLink.setAttribute('href', './pages/product.html?_id=' + dataId);

            const divImg = document.createElement('div')
            cardLink.appendChild(divImg);
            divImg.classList.add('container__img')

            const img = document.createElement('img');
            divImg.appendChild(img);
            img.classList.add('card__img');
            const attrAlt = document.createAttribute('alt');
            img.setAttributeNode(attrAlt);
            img.setAttribute('alt', `Image d'un ourson en peluche`);
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
            // Formatage de l'affichage du prix
            let priceFormat = dataPrice / 100;
            cardPrice.textContent = priceFormat.toFixed([2]) + ' €';
        }
    })
    // Affichage d'un message d'erreur si la requête API échoue
    .catch(() => {
        const grid = document.querySelector('.products-grid');
        const errMsg = document.createElement('p');
        grid.appendChild(errMsg);
        errMsg.textContent = `Une erreur s'est produite lors du chargement des produits`
    });