const productos = [
    {
        id: 1,
        nombre: 'Notebook',
        precio: 1000,
        cantidad: 10
    },{
        id: 2,
        nombre: 'Tablet',
        precio: 2000,
        cantidad: 20
    },{
        id: 3,
        nombre: 'Monitor',
        precio: 3000,
        cantidad: 30
    },{
        id: 4,
        nombre: 'Teclado',
        precio: 4000,
        cantidad: 40
    }
];

const productToUpdate = {nombre: 'Producto Modificado', precio: 5000};
const index = productos.findIndex((element) => element.id === 1);
let keys = Object.keys(productToUpdate);
let values = Object.values(productToUpdate);


for(let i = 0; i < keys.length; i++) {
    productos[index][keys[i]] = values[i]; 
}

console.log(productos);