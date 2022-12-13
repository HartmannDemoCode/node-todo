# Node-todo

## How to use
- Connect to server: `docker exec -it node-todo_web_1 bash`
- Interact with mongo: `mongosh` # used from mongodb 6.0 instead of mongo.
- Show all databases: `show databases`
- Use database: `use some-db`
- Show all collections: `show collections`
- Show all documents: `db.<collection name>.find()`
- Insert document: `db.<collection name>.insert({<key>: <value>})`
- Delete document: `db.<collection name>.deleteOne({<key>: <value>})`
- Update document: `db.<collection name>.updateOne({<key>: <value>}, {$set: {<key>: <value>}})`
- Show single document: `db.<collection name>.findOne({<key>: <value>})`
- Drop database: `db.dropDatabase()`
- Drop collection: `db.<collection name>.drop()`

## Mongo without Mongoose
- If we want to keep it light and breezy, we can use the native mongo driver.
- We can use the mongo driver to connect to the database and perform CRUD operations.
- We can do validation with something like sanitize-html or validator instead of mongoose.
- Code example:
  - Install: `npm install mongodb`

```js
const mongodb = require('mongodb');
sanitize = require('sanitize-html');
let db;
// const MongoClient = mongodb.MongoClient;
mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    db = client.db()
    app.listen(5000)
  }
)
app.post('/create-data', function (req, res) {
  // Sending request to create a data
  const message = sanitize(req.body.text);
  db.collection('data').insertOne({ text: message }, function (
    err,
    info
  ) {
    res.json(info.ops[0])
  })
})
```

## Mongo with Mongoose
- Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
- It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- Code example:
  - Install: `npm install mongoose`

```js
const mongoose = require('mongoose');
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dataSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Data = mongoose.model('Data', dataSchema);
app.post('/create-data', function (req, res) {
  // Sending request to create a data
  const data = new Data({ text: message });
  data.save().then(function (newData) {
    res.json(newData);
  });
});
```
