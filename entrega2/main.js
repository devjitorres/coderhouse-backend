const Container = require('./Container');

const container = new Container("products.json");

const main = async () => {
    const newProduct = await container.save({ title: "iPad Pro 12.9' 5ta Generacion WiFi+Cellular", price: 410199});

    console.log(newProduct);

    const object = await container.getById(5);
    console.log(object);

    await container.deleteById(2);

    const allProducts = await container.getAll();
    console.log(allProducts);
}

main();