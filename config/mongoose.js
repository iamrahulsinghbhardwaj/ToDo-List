const mongoose=require('mongoose'); //require the library

mongoose.connect('mongodb://localhost/todos'); //connect to database

const db=mongoose.connection; //aquire the connection(to check if it is sucessfull)

db.on('error',console.error.bind(console,"Error in connecting to MongoDb"));

db.once('open',function(){
    console.log('Connected to database');
});

//exporting to database
module.exports=db;
