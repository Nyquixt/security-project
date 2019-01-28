const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this file is for building schema, representing the records, in models, representing the databases

const someSchema = new Schema({
    someString: String,
    someNumber: Number
});

const someModel = mongoose.model('model', someSchema);

module.exports = someModel;