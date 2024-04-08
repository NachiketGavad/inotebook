const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost:27017';

const connectToMongo = ()=>{
    mongoose.connect(mongooseURI)
}

module.exports = connectToMongo 