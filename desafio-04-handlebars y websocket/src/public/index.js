//Socket Client
const socketIndex = io();

//DOM
const productsList = document.getElementById('products__list');

socketIndex.on('productsArray', (products)=>{
    
    productsList.innerHTML = '';

    products.forEach((p)=> {
        const itemList = document.createElement('div');
        itemList.innerHTML = `
        <h3>${p.name}</h3>
        <p>id: ${p.id}</p>
        <p>Price: $${p.price}</p>
        <p>Stock: ${p.stock}</p>
        `; 
        productsList.append(itemList);
    })
})