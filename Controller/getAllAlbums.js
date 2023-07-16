const {Album} = require('../Model/mongooseSchema');
const {StatusCodes} = require('http-status-codes');
const errorHandler= require('../handleErrors/handleError');


const getAllAlbums=async (req, res)=>{

    try {
        const albums= await Album.find({});
        res.status(StatusCodes.OK).json({"Albums": albums});
    } catch (error) {
        const errors= errorHandler.dbSchemaErrors(error);
        res.staus(StatusCodes.FORBIDDEN).json({message: errors});
    }
}
module.exports=getAllAlbums;