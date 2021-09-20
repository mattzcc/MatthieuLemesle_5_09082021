let productInLocStor = JSON.parse(localStorage.getItem('product'));
let resultSubTotal;
let total = 0;
//console.log(productInLocStor);

// Affichage contenu panier vide ou contenu
if (productInLocStor == null) {
    const selectClass = document.querySelector('#cart__content');
    const newEltP = document.createElement('p');
    newEltP.textContent = 'Votre panier est vide';
    selectClass.insertBefore(newEltP, selectClass.firstElementChild)
    console.log('je suis vide')
} else {

    console.log('je ne suis pas vide')

    for (let d = 0; d < productInLocStor.length; d++) {

        // Condition pour afficher l'élément HTML du total final s'il y a un article dans le panier
        if (d === 0)
            createTotalElement();


        const dataId = productInLocStor[d].productId;

        fetch('http://localhost:3000/api/teddies/' + dataId)
            .then(response => response.json())
            .then(dataProduct => {

                const contentCart = document.querySelector('#cart__content');
                const newEltLine = document.createElement('div')
                contentCart.appendChild(newEltLine);
                newEltLine.classList.add('cart__line');
                const newEltArticle = document.createElement('div');
                newEltLine.appendChild(newEltArticle);
                newEltArticle.classList.add('cart__product');
                newEltArticle.textContent = dataProduct.name;
                const newEltColor = document.createElement('div');
                newEltArticle.after(newEltColor);
                newEltColor.classList.add('cart__option');
                newEltColor.textContent = productInLocStor[d].optionProduct;
                const newEltQty = document.createElement('div');
                newEltColor.after(newEltQty);
                newEltQty.classList.add('cart__quantity');
                newEltQty.textContent = productInLocStor[d].quantity;
                const newEltPrice = document.createElement('div');
                newEltQty.after(newEltPrice);
                newEltPrice.classList.add('cart__price');

                // Fonction pour calculer le sous-total des produits (quantité * prix)
                function subTotal() {
                    resultSubTotal = productInLocStor[d].quantity * dataProduct.price;
                    return resultSubTotal;
                };

                resultSubTotal = subTotal();

                // Affectation et incrémentation du résultat de la fonction subTotal à la variable total
                total += resultSubTotal;
                // console.log(total);

                newEltPrice.textContent = (resultSubTotal / 100).toFixed(2) + ' €';

                const newEltTrash = document.createElement('div');
                newEltPrice.after(newEltTrash);
                newEltTrash.classList.add('cart__trash');
                newEltTrash.innerHTML = `<i class="far fa-trash-alt"></i>`
                // newEltTrash.dataset.refId = dataId;
                // newEltTrash.dataset.refOpt = productInLocStor[d].optionProduct;
                // modif l'elt i 

                // Suppression d'un article au clic sur la corbeille
                /* Je sélectionne l'élément sur lequel écouter l'évènement click 
                Si l'ID de l'article et sa couleur sont égaux avec la refId et refOpt alors trouve son index puis supprime l'objet */
                newEltTrash.addEventListener('click', () => {
                    console.log(productInLocStor[d]);

                    productInLocStor.splice(d, 1);
                    localStorage.setItem('product', JSON.stringify(productInLocStor));
                    location.reload();

                    if (!productInLocStor.length) {
                        localStorage.clear();
                        location.reload();
                    };
                });

                // Appel de la fonction avec la variable total en paramètre
                setTotalElement(total);
            });

    };
};

// Fonction pour créer l'élément HTML de l'affichage du total final du panier
function createTotalElement() {
    const selectMain = document.querySelector('.items-list');
    const newEltContainer = document.createElement('div');
    newEltContainer.classList.add('total-container', 'cart--style');
    selectMain.insertBefore(newEltContainer, selectMain.lastElementChild);
    const newEltTotal = document.createElement('div');
    newEltTotal.classList.add('total__title');
    newEltTotal.textContent = "MONTANT À REGLER :";
    newEltContainer.appendChild(newEltTotal);
    const newEltTotalPrice = document.createElement('div');
    newEltTotalPrice.classList.add('total__price');
    newEltContainer.appendChild(newEltTotalPrice);
};

// Fonction pour afficher le prix total final dans l'élément HTML
function setTotalElement(totalPrice) {
    document.getElementsByClassName('total__price')[0].textContent = (totalPrice / 100).toFixed(2) + ' €';
}

/* Regex champs du formulaire */

// Sélection du champ Nom
const lastNameInput = document.querySelector('#lastName');

// Sélection du champ Prénom
const firstNameInput = document.querySelector('#firstName');

// Sélection du champ Adresse
const addressInput = document.querySelector('#address');

// Sélection du champ Code Postal
const zipCodeInput = document.querySelector('#zipCode');

// Sélection du champ Ville
const cityInput = document.querySelector('#city');

// Sélection du champ Téléphone
const phoneInput = document.querySelector('#phone');

// Sélection du champ Email
const emailInput = document.querySelector('#email');

// Sélection de tous les champs input
const allInputs = document.querySelectorAll('.form__input');
//console.log(allInputs);


/*allInputs.forEach(inp => {
    let inpValue = inp.value;
    
    inp.addEventListener('onChange', function (e) {
        console.log(inpValue);
    });

});*/


for(let input of allInputs){
    console.log(input.value);



}

// Fonction pour vérifier le nom et prénom
function checkFullName() {
    const regexName = 
}