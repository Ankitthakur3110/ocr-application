require('dotenv').config();
const express = require('express');
const MainRoute = require('./Routes/MainRoute');
const app = express();

app.use('/', MainRoute);


app.listen(process.env.NODE_APPLICATION_PORT , (err) => {
    if(err){
        console.log('Something went wrong!')
    }
    console.log('this is goining to be the server');
})