const {Artist} = require('../Model/mongooseSchema');
const {StatusCodes} = require('http-status-codes');
const errorHandler= require('../handleErrors/handleError');

const getAllArtists= async (req, res)=>{

    try {
        const allArtists= await Artist.find({}).populate('albums','title genre releaseYear albumCover');
        res.status(StatusCodes.OK).json({"Artists": allArtists});
    } catch (error) {
        const errors= errorHandler.dbSchemaErrors(error);
        res.staus(StatusCodes.FORBIDDEN).json({message: errors});
    }
}
module.exports=getAllArtists;