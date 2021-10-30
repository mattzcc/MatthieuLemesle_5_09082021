// let productInLocStor = JSON.parse(localStorage.getItem('product'));
let resultSubTotal;
let total = 0;

// Affichage contenu panier vide ou contenu
if (!productInLocStor) {
    const selectClass = document.querySelector('#cart__content');
    const newEltP = document.createElement('p');
    newEltP.textContent = 'Votre panier est vide';
    selectClass.insertBefore(newEltP, selectClass.firstElementChild)

} else {

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

                newEltPrice.textContent = (resultSubTotal / 100).toFixed(2) + ' €';

                const newEltTrash = document.createElement('div');
                newEltPrice.after(newEltTrash);
                newEltTrash.classList.add('cart__trash');
                newEltTrash.innerHTML = `<i class="far fa-trash-alt"></i>`

                // Suppression d'un article au clic sur la corbeille
                /* Je sélectionne l'élément sur lequel écouter l'évènement click 
                Si l'ID de l'article et sa couleur sont égaux avec la refId et refOpt alors trouve son index puis supprime l'objet */
                newEltTrash.addEventListener('click', () => {

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
                // Stockage du prix total dans le localStorage pour affichage sur la page confirmation.html
                localStorage.setItem('displayTotalPrice', JSON.stringify((total / 100).toFixed(2) + ' €'))
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

// ------------- VALIDATION FORMULAIRE --------------- //
// Tous les champs input
let allInputs = document.querySelectorAll('.form__input');

allInputs.forEach(input => {
    input.addEventListener('focus', () => {
        clearInput(input);
    })
});

function clearInput(input) {
    input.classList.remove('form__input--red');
    input.nextElementSibling.textContent = ``
}

// Sélection du bouton Commander
const orderBtn = document.getElementById('order-btn');

// Écoute de l'évènement click sur le bouton commander
orderBtn.addEventListener('click', e => {
    e.preventDefault();


    if (productInLocStor) {

        let lastName = form.lastName;
        let firstName = form.firstName;
        let address = form.address;
        let city = form.city;
        let email = form.email;
        let zipCode = form.zipCode;
        let phone = form.phone;


        // Création de la RegExp Nom et Prénom
        const lastNameRegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð',-\s]{2,}$/g;
        const firstNameRegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð',-]{2,}$/g;
        const addressRegExp = /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð',.-\s]{10,}$/g;
        const zipCodeRegExp = /^[0-9]{5}$/g;
        const cityRegExp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð',-\s]+$/g;
        const phoneRegExp = /^[0-9]{10}$/g;
        const emailRegExp = /^[a-zA-Z0-9.\-_]+[@]{1}[a-zA-Z0-9.\-_]+[.]{1}[a-z]{2,10}$/g;


        function checkEmptyInput(input) {
            if (input.value.length !== 0) {
                return true;
            } else {
                displayNotValidInput(input);
                return false;
            }
        };

        // Fonction pour affichage utilisateur
        function displayNotValidInput(input) {
            input.classList.add('form__input--red');
            input.nextElementSibling.textContent = `Veuillez compléter ce champ.`
        };


        let b = 0;

        function checkInputValue(regExp, input) {

            if (regExp.test(input.value)) {
                return b += 1;
            } else {
                input.classList.add('form__input--red');
                return false;
            };
        };


        if (!checkInputValue(lastNameRegExp, lastName)) {
            document.getElementById('lastName').textContent = `Votre nom doit être composé d'au minimum 2 caractères et ne doit pas contenir de chiffres ou caractères spéciaux.`
        };

        if (!checkInputValue(firstNameRegExp, firstName)) {
            document.getElementById('firstName').textContent = `Votre prénom doit être composé d'au minimum 2 caractères et ne doit pas contenir de chiffres ou caractères spéciaux.`
        };

        if (!checkInputValue(addressRegExp, address)) {
            document.getElementById('address').textContent = `Votre adresse ne doit pas contenir de caractères spéciaux.`
        };

        if (!checkInputValue(zipCodeRegExp, zipCode)) {
            document.getElementById('zipCode').textContent = `Votre code postal doit être composé de 5 chiffres.`
        };

        if (!checkInputValue(cityRegExp, city)) {
            document.getElementById('city').textContent = `Votre ville ne doit pas contenir de chiffres ou caractères spéciaux.`
        };

        if (!checkInputValue(phoneRegExp, phone)) {
            document.getElementById('phone').textContent = `Votre numéro de téléphone doit être composé de 10 chiffres.`
        };

        if (!checkInputValue(emailRegExp, email)) {
            document.getElementById('email').textContent = `Votre adresse email est incorrecte.`
        };


        let valid = true;

        allInputs.forEach(input => {
            if (!checkEmptyInput(input)) {
                valid = false;
            }
        });

        if (valid && b === 7) {
            doPostRequest();
        };

        function doPostRequest() {
            // Création de l'objet contact pour y stocker les valeurs du formulaires remplies par l'utilisateur
            let contact = {
                lastName: lastName.value,
                firstName: firstName.value,
                address: address.value,
                city: city.value,
                email: email.value
            };

            // Création d'un tableau avec les ID des produits présents dans le localStorage
            let products = [];
            for (item of productInLocStor) {

                products.push(item.productId);

            }

            // Création de l'objet à envoyer au serveur
            const sendToServer = {
                contact,
                products
            };
            // ------------- POST REQUEST --------------- //
            // Envoi de l'objet vers le serveur
            fetch('http://localhost:3000/api/teddies/order', {
                    method: "POST",
                    body: JSON.stringify(sendToServer),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then(data => {
                    window.location = './confirmation.html?orderId=' + data.orderId;
                });

        };

    } else {
        alert('Votre panier est vide. \nVous ne pouvez pas valider votre commande.')
    };
});