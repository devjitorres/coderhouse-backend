const fs = require('fs');

class Container {
    constructor(fileName) {
        this.fileName = fileName; 
        this.readOrCreateNewFile();
    }

async readOrCreateNewFile() {
    try {
        await fs.promises.readFile(this.fileName, 'utf-8');
    }
    catch (error) {
        error.code === "ENOENT"
            ? this.createNewFile()
            : console.log(
                `Error: ${error.code}. An unexpected error occurred while trying to read ${this.fileName}`
    );
    }
}

async createNewFile() {
    fs.writeFile(this.fileName, "[]", (error) => {
        error
        ? console.log(error)
        : console.log(`A new file has been created under the name ${this.fileName}`);
    });
}

async save(Product) {
    try {
        const data = await this.getData();
        const parsed = JSON.parse(data);

        Product.id = parsed[parsed.length-1].id + 1;
        parsed.push(Product);

        await fs.promises.writeFile(this.fileName, JSON.stringify(parsed));
        return Product.id;
    }
    catch (error) {
        console.log(
            'An error occurred while trying to save an element'
        );
    }
}

async getById(id) {
    try {
        const data = await this.getData();
        const parsed = JSON.parse(data);

        return parsed.find((product) => product.id === id);
    }
    catch (error) {
        console.log(
            `An error occurred while trying to get the element with ID (${id})`
        );
    }
}

async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
}

async deleteById(id) {
    try {
        const data = await this.getData(); 
        const parsed = JSON.parse(data);
        const objectToRemove = parsed.find(
            (product) => product.id === id
        );  

        if (objectToRemove) {
            const index = parsed.indexOf(objectToRemove);
            parsed.splice(index, 1) //deletes element
            await fs.promises.writeFile(this.fileName, JSON.stringify(parsed)); 
        }
        else {
            console.log(`The element with ID ${id} doesn't exist`);
        }
    }
    catch (error) {
        console.log(
            `An error occurred when trying to delete the element with ID (${id}) from the file`
        );
    }
}

async deleteAll() {
    try {
        await this.createNewFile();
    }
    catch (error) {
        console.log(
            `An error occurred when trying to delete the information`
        );
    }
}

async getData() {
    const data = await fs.promises.readFile(this.fileName, 'utf-8');
    return data;
}

async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
}

}

module.exports = Container;