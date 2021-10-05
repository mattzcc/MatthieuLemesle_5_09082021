//Affichage de la notification indiquant le nombre d'articles dans le panier sur toutes les pages

let productInLocStor = JSON.parse(localStorage.getItem('product'));
let totalQty = 0;
productsInCart();

function productsInCart() {

    if(productInLocStor){
    productInLocStor.forEach(item => totalQty += item.quantity);
    document.getElementById('nbInCart').classList.add('header__nbInCart');
    document.getElementById('nbInCart').textContent = totalQty;
    } else {
    document.getElementById('nbInCart').classList.remove('header__nbInCart');
    document.getElementById('nbInCart').textContent = "";
    }
}