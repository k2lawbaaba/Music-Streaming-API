const express = require("express");
const routes= require("./Router/routes");
const connectMongoose = require('./Model/mongooseConnect');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');


const app =  express();
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(xssClean());
app.use(routes);

app.listen(2200, async()=>{
  await connectMongoose();
    console.log("Server running on port 2200");
})


module.exports=app;