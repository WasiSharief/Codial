const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind('error in connecting',console));

db.once('open',function(){
    console.log("connected to database successfully");
})

module.exports = db;