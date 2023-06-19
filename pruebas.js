const cant = 3;

const products = [1,2,3,4,5,6,7,8];

if(products.length >= cant) {
    console.log(products.splice(0, cant));
}else{
    console.log("Productos cortos");
}