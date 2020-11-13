const express = require('express');
const port = 8000;
const path = require('path');

const expresslayouts = require('express-ejs-layouts');
const app = express();



app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)

app.use('/',require('./routes'));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('./assets'));

app.listen(port,function(err){
    
    if(err){

        console.log(`Error while running server:${err}`);
        
    }
    console.log(`Server running on port: ${port}`);

})