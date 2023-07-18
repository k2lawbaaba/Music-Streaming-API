const mongoose = require("mongoose");
const {isEmail} = require('validator');


const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    lowercase:true,
    unique: true, // to ensure that there are no duplicate names in the database
  },
  email:{
    type: String,
    unique: true,
    validate:[isEmail, "Please enter a valid email"],
    lowercase:true,
    required:[true, "Email is Required"]
  },
  imageURL: String,
  genre: {
    type: String,
    enum: [
      "AfroBeat",
      "AfroBeats",
      "Pop",
      "Rock",
      "HipHop",
      "R&B",
      "Soul",
      "Jazz,",
      "Blues",
      "Country",
      "Electronic",
      "Reggae",
      "Classical",
      "Folk",
      "Dance",
      "Punk",
      "Metal",
      "Alternative",
      "Indie",
      "Funk",
      "Gospel",
      "Latin",
      "World",
    ], 
    message: '{VALUE} is not a genre'
    // restricting user input
  },
  albums:{
    type:[{type:mongoose.Schema.Types.ObjectId, ref:"album"}]
  },
  createdAt: Date
});

const AlbumSchema= new mongoose.Schema({
    title:{
        type :String,
        require:[true,"Title field cannot be empty"]    
    },
    
    releaseYear:{
        type:Number
    },
    albumCover: {
        type: String,
        // required:[true, 'Album cover is required'],
    },
    genre: {
        type: String,
        enum: [
            "AfroBeat",
            "Pop",
            "Rock",
            "HipHop",
            "R&B",
            "Soul",
            "Jazz,",
            "Blues",
            "Country",
            "Electronic",
            "Reggae",
            "Classical",
            "Folk",
            "Dance",
            "Punk",
            "Metal",
            "Alternative",
            "Indie",
            "Funk",
            "Gospel",
            "Latin",
            "World",
        ], 
        message: '{VALUE} is not a genre'
        // restricting user input
    },
    artistId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'artist',
        required:[true,"artistId is required"]
    },
    
})

module.exports.Artist = mongoose.model("artist", ArtistSchema);
module.exports.Album = mongoose.model("album",AlbumSchema);

