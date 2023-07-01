export const isProductInJson = (req, res, next) => {
    const { pid } = req.query;
    const products = cartsManager.getProducts();
    const isProdInJson = products.some(p => p.id === pid);

    if(isProdInJson) {next()}
    else {res.status(404).send({message: `Product does not exist`});}
}