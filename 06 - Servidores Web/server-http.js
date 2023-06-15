/* ----------------------------- 
        Servidores Web 
----------------------------- */

/* There are two ways to use http request, we could save it in a variable with the require method. Also, we´ll do it with node import. 
To use imports and exports we need to configure the prackage.json with the atribute "type": "module"*/

//const http = require('http');

import http from 'http';
import {arrayProductos} from './productos.js';

const server = http.createServer((req, res) => {
    //res.end('My first server with http') //send a message with res.end()
    console.log(req.url);
    if(req.url === './productos.js'){
        res.end(JSON.stringify(arrayProductos))
    }
    if(req.url === '/home'){
        res.end('Welcome')
    }
})

server.listen(8080, () => {
    //res.end("My first server")
    console.log('Server ok');
})

