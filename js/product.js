let urlId = new URL(window.location.href);
let urlProductId = urlId.searchParams.get('_id');

fetch('http://localhost:3000/api/teddies/' + urlProductId)
    .then(response => response.json())
    .then(dataProduct => {

        const productImage = document.querySelector('.product__img--size');
        productImage.setAttribute('src', dataProduct.imageUrl);
        const productName = document.querySelector('.product__name');
        productName.textContent = dataProduct.name;
        const productPrice = document.querySelector('.product__price');
        let productPriceFormat = dataProduct.price / 100;
        productPrice.textContent = productPriceFormat.toFixed([2]) + ' €'
        const productDescription = document.querySelector('.product__description');
        productDescription.textContent = dataProduct.description;

        for (let i = 0; i < dataProduct.colors.length; i++) {
            const productColorOption = dataProduct.colors[i];
            const productOption = document.querySelector('#color-select');
            const productSelection = document.createElement('option');
            productOption.append(productSelection);
            productSelection.classList.add('product__option');
            const attrValue = document.createAttribute('value');
            productSelection.setAttributeNode(attrValue);
            productSelection.setAttribute('value', productColorOption.toLowerCase())
            productSelection.textContent = productColorOption;
        }
    });