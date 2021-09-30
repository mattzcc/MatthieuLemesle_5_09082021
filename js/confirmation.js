// Création d'un objet URL 
let urlConfirmation = new URL(window.location.href);
// Récupération de l'ID de commande dans l'URL
let orderId = urlConfirmation.searchParams.get('orderId');
console.log(orderId)

// Affichage de l'ID de commande sur la page
document.getElementById('confirmation-details__id').textContent = orderId;

// Récupération du prix total stocké dans le localStorage
let displayPrice = JSON.parse(localStorage.getItem('displayTotalPrice'));

// Affichage du prix total de commande sur la page
document.getElementById('confirmation-details__price').textContent = displayPrice;

// Supprimer le contenu du localStorage
localStorage.clear();

// Condition s'il n'y a pas de prix stocké dans le localStorage quand l'utilisateur refresh la page il est redirigé sur index.html
if(!displayPrice){
    window.location = '../index.html'
}