const express = require('express');
const port = 8000;
const path = require('path');

const app = express();
// app.use('view engine','ejs');
// app.use('views',path.join(__dirname,'views'));
app.use('/',require('./routes'));

app.listen(port,function(err){
    
    if(err){
        console.log(`Error while running server:${err}`);
    }
    console.log(`Server running on port: ${port}`);

})