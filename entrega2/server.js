const Container = require('./container')
const express = require('express');
const app = express();
const PORT = 8080;
const container = new Container('products.json');

app.get('/', (request,response) => {
    response.send('Welcome to Express Server.')
});

app.get('/products', async (request,response) => {
    const products = await container.getAll();
    response.json(products);
});

app.get('/randomProduct', async (request,response) => {
    const products =  await container.getAll();
    const last = products.length;
    const randomId = randomNumber(1,last);
    const randomProduct = await container.getById(randomId);

    response.json(randomProduct);
});

const randomNumber = (min, max) => {
    return Math.floor((Math.random() * (max+1 - min)) + min);
}

const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));