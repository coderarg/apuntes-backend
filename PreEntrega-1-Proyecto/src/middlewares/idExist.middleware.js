export const idExist = (req, res, next) => {
    const newProduct = req.body;
    if(!!newProduct.id){
        res.send("You can not modify the id")
    }else{
        next()
    }
}