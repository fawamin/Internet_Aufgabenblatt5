/**
 * API implementation
 *
 * @copyright 2019 Christian Gawron <gawron.christian@fh-swf.de>
 * @license MIT
 */
let db = require('./persistence/mongodb.js');

module.exports = {
    //Get DB connection 
    init: () => {
        return db.connect();
    },

    getTodos: (req, res) => {
        db.queryAll()
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                console.log("error: %o", err);
                res.status(500).send(err)
            });

    },
    
    getTodo: (req, res) => {
        let id = req.params.id;
        db.queryById(id)
            .then(result => {
                console.log("queryBYId: %s => %o", id, result);
                if(!result){
                    res.status(404).sent({});
                } else {
                    res.send(result);
                }
            })
            .catch(err => {
                console.log("error: %o", err);
                res.status(500).send({ error: err, status: 500 });
            });
    },

    createTodo: (req, res) => {
        console.log("createTodo: %o",req.body);
        db.insert(req.body)
            .then(result => {
                console.log("createTodo: db returned %o",result);
                res.send(result);
            })
            .catch(err => res.status(500).send(err));        
    },

    //Function can only update the todo by adding new or replacing values of old attributes, not deleting old attributes
    saveTodo: (req, res) => {
        // Get Old Todo
        let id = req.params.id;
        console.log("saveTodo: %s %o", id, req.body);
        db.queryById(id)
            .then(result => {
                // Updated Todo
                let todoupdate = req.body;
                //Go through all changes in the request and update the todo
                for(let i in todoupdate)
                {
                    result[i] = todoupdate[i];
                }
                //Save the updated todo
                db.update(id, result)
                .then(re => {
                    console.log("saveTodo: db returned %o", re);
                    res.send(re);
                })
                .catch(err => res.status(500).send(err));
            })
            .catch(err => res.status(500).send(err));
    },
    
    deleteTodo: (req, res) => {
        let id = req.params.id;
        console.log("deleteTodo: %s %o", id, req.body);
        db.delete(id, req.body)
            .then(result => {
                console.log("deleteTodo: db returned %o", result);
                res.status(204).send();
            })
            .catch(err => res.status(500).send(err));

    }

}