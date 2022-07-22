class User {

    constructor(name, lastName, books, pets) {
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.name} ${this.lastName}`
    }

    addPet(petName) {
        this.pets.push(petName);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(bookName, bookAuthor) {
        this.books.push({bname: bookName, author: bookAuthor});
    }

    getBookNames() {
        return this.books.map((book) => book.bname)
    }
}

const books = [
    {
        bname: 'A Christmas Carol',
        bookAuthor: 'Charles Dickens'
    },
    {
        bname: 'The Catcher in the Rye',
        bookAuthor: 'J. D. Salinger'
    },
    {
        bname: 'Fahrenheit 451',
        bookAuthor: 'Ray Bradbury'
    }
]

const User1 = new User ('Peter', 'Shelton', books, ['Conejo', 'Perro', 'Gato']);

console.log(User1);

console.log(User1.getFullName());

console.log(User1.countPets());
User1.addPet('Loro');
console.log(User1.countPets());

console.log(User1.getBookNames());
User1.addBook('Gone with the Wind', 'Margaret Mitchell');
console.log(User1.getBookNames());
