// Création d'un objet URL 
let urlId = new URL(window.location.href);
// Récupération de l'ID du produit dans l'URL
let urlProductId = urlId.searchParams.get('_id');
//Vérifier si localstorage est vide ou contient des données 
let productInLocStor = JSON.parse(localStorage.getItem('product'));

let totalQty = 0;

// Sélection du bouton "Ajouter au panier"
const addCart = document.querySelector('.product__button');

// Requête API via l'ID du produit (contenu dans l'URL)
fetch('http://localhost:3000/api/teddies/' + urlProductId)
    .then(response => response.json())
    .then(dataProduct => {

        // Insertion des données de l'API dans le HTML
        const productImage = document.querySelector('.product__img--size');
        productImage.setAttribute('src', dataProduct.imageUrl);

        const productName = document.querySelector('.product__name');
        productName.textContent = dataProduct.name;

        const productPrice = document.querySelector('.product__price');
        let productPriceFormat = dataProduct.price / 100;
        productPrice.textContent = productPriceFormat.toFixed([2]) + ' €';

        const productDescription = document.querySelector('.product__description');
        productDescription.textContent = dataProduct.description;


        const productOption = document.querySelector('#color-select');
        // Boucle afin d'itérer sur les options de couleurs de chacun des produits
        for (let i = 0; i < dataProduct.colors.length; i++) {

            const productColorOption = dataProduct.colors[i];
            // const productOption = document.querySelector('#color-select');
            const productSelection = document.createElement('option');
            productOption.append(productSelection);
            productSelection.classList.add('product__option');
            const attrValue = document.createAttribute('value');
            productSelection.setAttributeNode(attrValue);
            productSelection.setAttribute('value', productColorOption.toLowerCase());
            productSelection.textContent = productColorOption;
        }


        //Evenement au clic sur le bouton Ajouter au panier
        addCart.addEventListener('click', e => {
            const optionSelection = productOption.value;
            // Condition pour vérifier si l'option a bien été choisie : Si elle ne l'est pas, une alerte est envoyée à l'utilisateur et le produit n'est pas ajouté au panier. Sinon un objet avec l'ID, l'option et la quantité du produit est crée.
            if (optionSelection == 'null') {
                e.preventDefault();
                window.alert(`Vous devez sélectionner le coloris de l'article.`);
            } else {

                //Création objet à intégrer dans le localstorage
                let productValues = {
                    productId: dataProduct._id,
                    optionProduct: optionSelection,
                    quantity: 1
                };

                // Si localstorage vide, création d'un tableau vide
                if (!productInLocStor) {
                    productInLocStor = [];
                };

                let c = 0;

                //Boucle pour itérer sur les objets du tableau du localstorage
                for (let p = 0; p < productInLocStor.length; p++) {

                    //Si l'ID du produit dans le localstorage est égal à l'ID de l'objet que l'on veut ajouter au panier ET que leur option (couleur) est identique, alors j'incrémente +1 à la quantité
                    if ((productInLocStor[p].productId == productValues.productId) && (productInLocStor[p].optionProduct == productValues.optionProduct)) {
                        productInLocStor[p].quantity++;
                        localStorage.setItem('product', JSON.stringify(productInLocStor));
                        c = 1;
                    };
                };

                if (c === 0) {
                    //Insérer les données/objets dans le tableau
                    productInLocStor.push(productValues);
                    // Mettre les données dans le localstorage au format objet JSON
                    localStorage.setItem('product', JSON.stringify(productInLocStor));
                };
                window.alert(`Votre article a bien été ajouté au panier.`)
            };
        });

        // Ajout de la bulle de notification indiquant le nb d'articles dans le panier
        function sumQty() {
            productInLocStor.forEach(el => totalQty += el.quantity);
            return totalQty;
        };

        function displayBubble(totalQty) {
            document.getElementById('nbInCart').classList.add('header__nbInCart');
            document.getElementById('nbInCart').textContent = totalQty;
        };


        function removeBubble() {
            document.getElementById('nbInCart').classList.remove('header__nbInCart');
            document.getElementById('nbInCart').textContent = "";
        };

        if (productInLocStor) {
            sumQty();
            displayBubble(totalQty)
        } else {
            removeBubble();
        };

        addCart.addEventListener('click', (e) => {
            const optionSelection = productOption.value;
            if (optionSelection !== 'null') {
                totalQty++
                displayBubble(totalQty)
            } else {
                e.preventDefault();
            }
        });
    });