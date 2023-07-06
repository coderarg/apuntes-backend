//Socket Client
const socketIndex = io();

//DOM
const productsDiv = document.getElementById('productsWrapper');

socketIndex.on('productsArray', (products)=>{
    
    productsDiv.innerHTML = ' ';

    products.forEach((p)=> {
        const itemList = document.createElement('ul');
        itemList.innerHTML = `<li>${p.nombre}</li>`; 
        productsDiv.append(itemList);
    })
})