const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

const libros = [
    { id: "1", titulo: "Brave New World", autorId: "2", isbn: "0060850523", anioPublicacion: 1932 },
    { id: "2", titulo: "The Catcher in the Rye", autorId: "4", isbn: "0316769487", anioPublicacion: 1951 },
    { id: "3", titulo: "The Grapes of Wrath", autorId: "8", isbn: "0143039431", anioPublicacion: 1939 },
    { id: "4", titulo: "War and Peace", autorId: "10", isbn: "1400079985", anioPublicacion: 1869 },
    { id: "5", titulo: "Sense and Sensibility", autorId: "7", isbn: "0141439661", anioPublicacion: 1811 }
];

const autores = [
    { id: "1", nombre: "Leo Tolstoy", nacionalidad: "Russian" },
    { id: "2", nombre: "Aldous Huxley", nacionalidad: "British" },
    { id: "3", nombre: "Harper Lee", nacionalidad: "American" },
    { id: "4", nombre: "J.D. Salinger", nacionalidad: "American" },
    { id: "5", nombre: "John Steinbeck", nacionalidad: "American" },
    { id: "6", nombre: "Herman Melville", nacionalidad: "American" },
    { id: "7", nombre: "Jane Austen", nacionalidad: "British" },
    { id: "8", nombre: "J.R.R. Tolkien", nacionalidad: "British" },
    { id: "9", nombre: "Virginia Woolf", nacionalidad: "British" },
    { id: "10", nombre: "Fyodor Dostoevsky", nacionalidad: "Russian" }
];

const prestamos = [
    { id: "1", libroId: "1", usuario: "Emma Jones", fechaPrestamo: "2024-04-01", fechaDevolucion: null },
    { id: "2", libroId: "3", usuario: "Bob Johnson", fechaPrestamo: "2024-02-24", fechaDevolucion: "2024-03-10" },
    { id: "3", libroId: "5", usuario: "Sophia Brown", fechaPrestamo: "2024-05-05", fechaDevolucion: null },
    { id: "4", libroId: "2", usuario: "Liam Wilson", fechaPrestamo: "2024-06-07", fechaDevolucion: null }
];

const typeDefs = gql(fs.readFileSync('./libros.graphql', { encoding: 'utf-8' }));

const resolvers = {
    Query: {
        todosLosLibros: () => libros,
        libroPorId: (parent, { id }) => libros.find(libro => libro.id === id),
        todosLosAutores: () => autores,
        prestamosActivos: () => prestamos.filter(prestamo => !prestamo.fechaDevolucion)
    },
    Libro: {
        autor: (libro) => autores.find(autor => autor.id === libro.autorId)
    },
    Prestamo: {
        libro: (prestamo) => libros.find(libro => libro.id === prestamo.libroId)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
});