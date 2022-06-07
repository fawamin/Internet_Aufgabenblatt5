/**
 * Beispielapplikation "Zentraler Pizzaservice" aus der Vorlesung Internettechnologien, Sommersemester 2020
 * Diese Datei implementiert den Webserver mithilfe von Express.js
 *
 * @copyright 2020 Christian Gawron <gawron.christian@fh-swf.de>
 * @license MIT
 * 
 */
require('dotenv').config(); // load .env file
const express = require('express'); // express framework
const cors = require('cors'); // for cross-origin resource sharingq
const api = require('./api.js'); // our api routes
const app = express();

// Define middleware
app.use(express.static('frontend')); //frontend directory
app.use(cors());
app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
api.init().then(()=>{
    //Connect http to the api
    app.get('/api/todo', api.getTodos);
    app.get('/api/todo/:id',api.getTodo);
    app.post('/api/todo', api.createTodo);
    app.put('/api/todo/:id', api.saveTodo);
    app.delete('/api/todo/:id',api.deleteTodo);
    app.listen(3000);
}).catch((err) => console.error("initialization error: %o", err));