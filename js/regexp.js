/* Regex champs du formulaire */

// Sélection du formulaire
const form = document.getElementById('form')

// ---- REGEX NOM ---- //

// ---- FIN REGEX NOM ---- //

// ---- REGEX PRÉNOM ---- //

// ---- FIN REGEX PRÉNOM ---- //

// ---- REGEX ADRESSE ---- //

// ---- FIN REGEX ADRESSE ---- //

// ---- REGEX CODE POSTAL ---- //
let boolValueZipCode;
// Ecouter la modification du code postal
form.zipCode.addEventListener('change', function () {
    validZipCode(this);
});

function validZipCode(inputZipCode) {

    // Création de la RegExp
    const zipCodeRegExp = /^[0-9]{5}$/g;

    let checkZipCode = zipCodeRegExp.test(inputZipCode.value);
    console.log('checkZipCode');
    console.log(checkZipCode);

    // Affichage d'un message pour l'utilisateur 
    if (checkZipCode) {
        inputZipCode.style.border = '2px green solid'
        return true;
    } else {
        inputZipCode.style.border = '2px red solid'
        document.getElementById('zipCode').textContent = `Le code postal doit contenir 5 chiffres`
        return false;
    }
}

boolValueZipCode = validZipCode(form.zipCode);

// ---- FIN REGEX CODE POSTAL ---- //

// ---- REGEX VILLE ---- //
let boolValueCity;

// Ecouter la modification 
form.city.addEventListener('input', function () {
    validCity(this);
});

function validCity(inputCity) {

    

    let checkCity = cityRegExp.test(inputCity.value);
    console.log('checkCity');
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
    console.log('checkTelephone');
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
    console.log('checkEmail');
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
// document.querySelectorAll('.form__input').forEach(item => {
//     item.addEventListener('mousedown', function () {
//         item.classList.remove('form__input--green', 'form__input--red');
//     });
// });

// console.log(boolValueEmail);