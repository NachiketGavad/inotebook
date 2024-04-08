const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017/inotebookdb';

const connectToMongo = ()=>{
    mongoose.connect(mongooseURI)
}

module.exports = connectToMongo 