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
                // console.log(total);

                newEltPrice.textContent = (resultSubTotal / 100).toFixed(2) + ' €';

                const newEltTrash = document.createElement('div');
                newEltPrice.after(newEltTrash);
                newEltTrash.classList.add('cart__trash');
                newEltTrash.innerHTML = `<i class="far fa-trash-alt"></i>`

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

// Sélection du bouton Commander
const orderBtn = document.getElementById('order-btn');

// Écoute de l'évènement click sur le bouton commander
orderBtn.addEventListener('click', e => {
    e.preventDefault();

    let lastName = form.lastName.value;
    let firstName = form.firstName.value;
    let address = form.address.value;
    let city = form.city.value;
    let email = form.email.value;
    let zipCode = form.zipCode.value;
    let phone = form.phone.value;


    // Création de la RegExp Nom et Prénom
    const lastNameRegExp = /^[a-zA-Z-'\s]*?$/g;
    const firstNameRegExp = /^[a-zA-Z-']*?$/g;
    const zipCodeRegExp = /^[0-9]{5}$/g;
    const phoneRegExp = /^[0-9]{10}$/g;
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;



    function testEmptyInput(regExp, input, inp, smallId) {
        // Si un champ est vide
        if (input) {
           
           return testInputValue(regExp, input, inp, smallId);

        } else {
            console.log(`${input} EMPTY`);
            
           return alert('Merci de remplir tous les champs du formulaire.');
        }
    };




    function testInputValue(regExp, input, inp, smallId) {

        // Si valeur de l'input renseignée par l'utilisateur est true
        if (regExp.test(input)) {
            console.log(`${input} OK`);
         //   return true;
        } else { // Si l'entrée utilisateur est fausse
            console.log(`NOT OK`);
            displayNotValidInput(inp, smallId);
         //   return false;
        };
    };

    // Fonction pour affichage utilisateur
    function displayNotValidInput(inp, smallId) {
        inp.classList.add('form__input--red');
        document.getElementById(`${smallId}`).classList.add('form__textAlert--red');
    };




    if (productInLocStor) {
        //  if (testInputValue(lastNameRegExp, lastName, form.lastName) && testInputValue(firstNameRegExp, firstName, form.firstName) && testInputValue(zipCodeRegExp, zipCode, form.zipCode) && testInputValue(phoneRegExp, phone, form.phone) && testInputValue(emailRegExp, email, form.email)) {

        function doPostRequest() {
            // Création de l'objet contact pour y stocker les valeurs du formulaires remplies par l'utilisateur
            let contact = {
                lastName: lastName,
                firstName: firstName,
                address: address,
                city: city,
                email: email
            };

            // Création d'un tableau avec les ID des produits présents dans le localStorage
            let products = [];
            for (item of productInLocStor) {

                products.push(item.productId);

            }
            console.log(products);


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
                    console.log(data.orderId);
                    window.location = '/pages/confirmation.html?orderId=' + data.orderId;
                });

        };

        // } else {
        //    alert('Veuillez vérifier votre formulaire.')
        // }


        // test appel fonction sur les champs individuellement

        if (testEmptyInput(lastNameRegExp, lastName, form.lastName, 'lastName')) {
            document.getElementById('lastName').textContent = `Votre nom ne doit pas contenir de chiffres ou de caractères spéciaux.`;
        } else {
            return;
        };

        if (testEmptyInput(firstNameRegExp, firstName, form.firstName, 'firstName')) {
            document.getElementById('firstName').textContent = `Votre prénom ne doit pas contenir de chiffres ou de caractères spéciaux.`;
        } else {
            return;
        };

        if (testEmptyInput(zipCodeRegExp, zipCode, form.zipCode, 'zipCode')) {
            document.getElementById('zipCode').textContent = `Votre code postal doit contenir 5 chiffres.`;
        } else {

            return;
        };

        if (testEmptyInput(phoneRegExp, phone, form.phone, 'phone')) {
            document.getElementById('phone').textContent = `Votre numéro de téléphone doit être composé de 10 chiffres.`;
        } else {

            return;
        };

        if (testEmptyInput(emailRegExp, email, form.email, 'email')) {
            document.getElementById('email').textContent = `Votre adresse email est incorrecte.`;
        } else {
            return;
        };

        // if (testInputValue(lastNameRegExp, lastName, form.lastName) && testInputValue(firstNameRegExp, firstName, form.firstName) && testInputValue(zipCodeRegExp, zipCode, form.zipCode) && testInputValue(phoneRegExp, phone, form.phone) && testInputValue(emailRegExp, email, form.email)) {
        //     doPostRequest();
        // };



    } else {
        alert('Votre panier est vide. \nVous ne pouvez pas valider votre commande.')
    };
});
form.lastName.addEventListener('onkeypress', function (e) {
    console.log('KeyPress');
    form.lastName.classList.add('form__input--red');
});

// Si le panier est vide et que le formulaire est correct > Alert Votre Panier est vide
// Si le panier est vide et que le formulaire est incorrect > Alert Votre Panier est vide
// Si le panier n'est pas vide et que le forumnaire est correct > Envoi des données
// Si le panier n'est pas vide et que le forumnaire est incorrect > Alert Merci Vérifier formulaire