/* --------------------------------- 
                Express 
-------------------------------- */

/**npm install express or npm i express */
import express from 'express';

import {arrayProductos} from './productos.js';

const app = express();

app.get('/', (req, res) => {
    //res.send("First server with express")
    //res.send({message: 'Hola'})
    //res.send("<h1> Express server</h1>");
    //res.send(`
    //primera linea
    //segunda linea
    //`);
    //res.status(200).send(arrayProductos);
    //res.json("home");

    let error = true;
    if(error){
        res.status(404).json({message: "Error"});
    }else{
        res.status(200).send(arrayProductos);
    }
});

app.get('/productos', (req, res) => {
    //console.log(req);
    const { value } = require.query;
    console.log(value);
    const arrayFilter = arrayProductos.filter(prod => prod.price > value);
    res.status(200).json(arrayFilter);
});

app.listen(8080, ()=> {
    console.log("Server is running on port 8080");
});