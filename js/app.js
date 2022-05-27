
require('dotenv').config();
const express = require('express');
//const passport = require('passport');
const cors = require('cors');
const api = require('./api.js');
//const auth = require('./auth.js');
const app = express();

// define "middlewares"
app.use(express.static('static'));
app.use(cors());
app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(api.verify); // Verify body


api.init().then(()=>{
    app.get('/api/todo', api.getTodos);
    app.get('/api/todo/:id',api.getTodo);
    app.post('/api/todo', api.createTodo);

    app.put('/api/todo/:id', api.saveTodo);
    app.delete('/api/todo/:id',api.deleteTodo);

    app.listen(3000);
}).catch((err) => console.error("initialization error: %o", err));