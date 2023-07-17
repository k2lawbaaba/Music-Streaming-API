require("dotenv").config();
const mongoose = require('mongoose');

const uri= process.env.COMPASS || process.env.DATABASE_ATLAS;
const connectMongoose=()=>{
  return   mongoose.connect(uri)
    .then(()=>{
        console.log(`Connected to ${uri}`)
    }).catch((err)=>{
        console.log(`Connection to ${uri} failed ${err}`);
    })
    
}

module.exports=connectMongoose;