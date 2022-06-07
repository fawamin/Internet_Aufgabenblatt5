require('dotenv').config(); // load .env file
const express = require('express'); // express framework
const cors = require('cors'); // for cross-origin resource sharingq
const api = require('./api.js'); // our api routes
const app = express();
app.use(express.static('frontend')); //static directory
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