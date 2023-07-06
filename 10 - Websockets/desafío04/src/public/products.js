const socketIndex = io();

//DOM
const productsList = document.getElementById('products__list');

socketIndex.on('productsArray', (products)=>{
    
    productsList.innerHTML = ' ';

    products.forEach((p)=> {
        const itemList = document.createElement('ul');
        itemList.innerHTML = `<li>${p.nombre}</li>`; 
        productsList.append(itemList);
    })
})