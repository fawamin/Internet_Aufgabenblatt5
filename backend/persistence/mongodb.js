/**
 * Persistance layer using MongoDB
 *
 * @copyright 2019 Christian Gawron <gawron.christian@fh-swf.de>
 * @license MIT
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB;
let db = null;
let collection = null;
class DB {
    connect() {
        return MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .catch(err => {
            console.log("Error while connecting to mongodb url=%s: %o", url, err);
            return Promise.reject({ err: err, message: "mongo connection failed" });
        })
        .then(function (client) {
            db = client.db(dbName);
            collection = db.collection(process.env.MONGO_COLLECTION);
        })
    }
 
    queryAll() {
        return collection.find().toArray();
    }
 
    queryById(id) {
        return collection.findOne({ _id: new ObjectId(id) });
    }
 
    update(id, todo) {
        return collection.replaceOne({ _id: new ObjectId(id) }, todo);
    }
 
    delete(id) {
        return collection.deleteOne({ _id: new ObjectId(id) });
    }
 
    insert(todo) {
        return collection.insertOne(todo);
    }
}
 
module.exports = new DB();
 