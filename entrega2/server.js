const Container = require('./src/container')
const express = require('express');
const app = express();
const PORT = 8080;
const container = new Container('products.json');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = express.Router();
app.use('/api/products', router);

router.get('/', async (req, res) => {
    const products = await container.getAll();
    res.status(200).json(products);
})

/* router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await container.getById(id);

    product 
        ? res.status(200).json(product)
        : res.status(404).json({error: 'Product not found'})

}) */

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await container.getById(id);
    console.log(product);

    product
        ? res.status(200).json(product)
        : res.status(404).json({error: 'Product not found'});
    
})

router.post('/', async (req, res) => {
    const {body} = req;
    const newId = await  container.save(body);
    res.status(200).send(`Product was added correctly with ID: ${newId}`);
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const updatedProduct = await container.updateProductById(id, body);
    updatedProduct
        ? res.status(200).send(`Product with ID ${id} was updated`)
        : res.status(404).send(`Product with ID ${id} not found and therefore nothing was updated`);
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await container.deleteById(id);
    deletedProduct
        ? res.status(200).send(`Product with ID ${id} was deleted`)
        : res.status(404).send(`Product with ID ${id} couldn't be deleted because it doesn't exist`);
})

const server = app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})

server.on('error', (err) => console.log(err));