const {Router} = require('express');
const createAlbum = require ("../Controller/createAlbum");
const createArtist = require("../Controller/createArtist");
const deleteAlbum= require("../Controller/deleteAlbumById");
const deleteArtist = require('../Controller/deleteArtist');
const getAlbumById = require('../Controller/getAlbumById');
const getAllAlbums = require("../Controller/getAllAlbums");
const getArtistById= require('../Controller/getArtistById');
const getAllArtists = require("../Controller/getArtists");
const updateAlbumById = require('../Controller/updateAlbumById');
const updateArtistById = require("../Controller/updateArtitsById");
const multer = require('multer');



const route= Router();
const upload = multer({dest:'images/'});

//get methods
route.get('/api/artists', getAllArtists);
route.get('/api/artists/:id', getArtistById);
route.get('/api/albums', getAllAlbums);
route.get('/api/albums/:id', getAlbumById);

// Post methods
route.post('/api/artists',upload.single('file'), createArtist);
route.post('/api/albums',createAlbum);


// PUT methods for update
route.put('/api/artists/:id',upload.single('file'), updateArtistById);
route.put('/api/albums/:id', updateAlbumById);

// DELETE METHODS
route.delete("/api/albums/:id", deleteAlbum) ;  //DELETE ALBUM
route.delete("/api/artist/:id", deleteArtist );






module.exports= route;