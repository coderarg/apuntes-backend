const socketProducts = io();

//DOM

const form = document.getElementById('products__form');
const nameInput = document.getElementById('product__name');
const priceInput = document.getElementById('product__price');
const stockInput = document.getElementById('product__stock');

const buttons = document.querySelectorAll('.delete-button');

const productsList = document.getElementById('products__list');

socketProducts.on('productsArray', (products)=>{
    
    productsList.innerHTML = '';

    products.forEach((p)=> {
        const itemList = document.createElement('div');
        itemList.innerHTML = `
        <h3>${p.name}</h3>
        <p>id: ${p.id}</p>
        <p>Price: $${p.price}</p>
        <p>Stock: ${p.stock}</p>
        <button class="delete-button" id="${p.id}">Borrar</button>
        `;
        productsList.append(itemList);
    })

    deleteButtons();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        name: nameInput.value,
        price: priceInput.value,
        stock: stockInput.value
    }

    socketProducts.emit('productObject', product);

})

const deleteButtons = () => {

    const buttons = document.querySelectorAll('.delete-button');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            socketProducts.emit('deleteProduct', Number(button.id));
        })
    })
}