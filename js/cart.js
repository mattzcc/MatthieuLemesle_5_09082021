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

// Sélection du formulaire
const form = document.getElementById('form')

// ---- REGEX TELEPHONE ---- //
let boolValueTelephone;
// Ecouter la modification 
form.phone.addEventListener('input', function () {
    validTelephone(this);
});

function validTelephone(inputTelephone) {

    // Création de la RegExp 
    const telephoneRegExp = /^[0-9]{10}$/g;

    let checkTelephone = telephoneRegExp.test(inputTelephone.value);
    console.log(checkTelephone);

    // Affichage d'un message pour l'utilisateur 
    if (checkTelephone) {
        inputTelephone.style.border = '2px green solid'
        return true;
    } else {
        inputTelephone.style.border = '2px red solid'
        return false;
    }
}

boolValueTelephone = validTelephone(form.phone);
// ---- FIN REGEX TELEPHONE ---- //

// ---- REGEX VILLE ---- //
let boolValueCity;

// Ecouter la modification 
form.city.addEventListener('input', function () {
    validCity(this);
});

function validCity(inputCity) {

    // Création de la RegExp 
    const cityRegExp = /^[a-zA-Z',.\s-]{1,25}$/g;

    let checkCity = cityRegExp.test(inputCity.value);
    console.log(checkCity);

    // Affichage d'un message pour l'utilisateur 
    if (checkCity) {
        inputCity.style.border = '2px green solid'
        return true;
    } else {
        inputCity.style.border = '2px red solid'
        return false;
    }
}

boolValueCity = validCity(form.city);

// ---- FIN REGEX VILLE ---- //

// ---- REGEX CODE POSTAL ---- //
let boolValueZipCode;
// Ecouter la modification du code postal
form.zipCode.addEventListener('input', function () {
    validZipCode(this);
});

function validZipCode(inputZipCode) {

    // Création de la RegExp
    const zipCodeRegExp = /^[0-9]{5}$/g;

    let checkZipCode = zipCodeRegExp.test(inputZipCode.value);
    console.log(checkZipCode);

    // Affichage d'un message pour l'utilisateur 
    if (checkZipCode) {
        inputZipCode.style.border = '2px green solid'
        return true;
    } else {
        inputZipCode.style.border = '2px red solid'
        return false;
    }
}

boolValueZipCode = validZipCode(form.zipCode);

// ---- FIN REGEX CODE POSTAL ---- //

// ---- REGEX EMAIL ---- //
let boolValueEmail;
// Ecouter la modification 
form.email.addEventListener('input', function () {
    validEmail(this);
});
let checkEmail;

function validEmail(inputEmail) {

    // Création de la RegExp 
    let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

    checkEmail = emailRegExp.test(inputEmail.value);
    console.log(checkEmail);

    // Affichage d'un message pour l'utilisateur 
    if (checkEmail) {
        // inputEmail.style.border = '2px green solid'
        document.querySelector('.form__validIcon').textContent = `✅`
        document.querySelector('.form__validIcon').classList.add('form__input--logoChecked')
        inputEmail.classList.add('form__input--green');
        // document.getElementById('email').style.color = 'green'
        // document.getElementById('email').style.fontWeight = 'bold'
        return true;
    } else {
        // inputEmail.style.border = '2px red solid'
        document.getElementById('email').textContent = `❌ Merci de saisir une adresse email valide ❌`;
        inputEmail.classList.add('form__input--red');
        document.getElementById('email').classList.add('form__textAlert--red');
        // document.getElementById('email').style.color = 'red'
        // document.getElementById('email').style.fontWeight = 'bold'
        return false;
    }
}

boolValueEmail = validEmail(form.email);

// ---- FIN REGEX EMAIL ---- //
document.querySelectorAll('.form__input').forEach(item => {
    item.addEventListener('mousedown', function () {
        item.classList.remove('form__input--green', 'form__input--red');
    });
});

console.log(boolValueEmail);
// ------------- POST REQUEST --------------- //

const orderBtn = document.getElementById('order-btn');


orderBtn.addEventListener('click', e => {
    e.preventDefault();

    let lastName = form.lastName.value;
    let firstName = form.firstName.value;
    let address = form.address.value;
    let city = form.city.value;
    let email = form.email.value;

    // Ajout condition Si champ nom/prénom/adresse etc == true > btn commander OK / Si non btn commandé bloqué
    // if ((boolValueCity) && (boolValueTelephone) && (boolValueZipCode) && (boolValueEmail)) {

    let contact = {
        lastName: lastName,
        firstName: firstName,
        address: address,
        city: city,
        email: email
    }

    console.log(contact);

    //   }

    function getFields(list, field) {
        //  reduce the provided list to an array only containing the requested field
        return list.reduce(function (carry, item) {
            //  check if the item is actually an object and does contain the field
            if (typeof item === 'object' && field in item) {
                carry.push(item[field]);
            }

            //  return the 'carry' (which is the list of matched field values)
            return carry;
        }, []);
    }

    let products = getFields(productInLocStor, 'productId');
    console.log(products);

    // Création de l'objet à envoyer au serveur
    const sendToServer = {
        contact,
        products
    };

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
            console.log(data.orderId)
            window.location = '/pages/confirmation.html?' + data.orderId
        });


});