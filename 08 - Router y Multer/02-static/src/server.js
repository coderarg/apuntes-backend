import express from 'express';
import dirname from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})