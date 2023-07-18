const { Artist } = require("../Model/mongooseSchema");
const { IdValidator } = require("../Validators/joiValidator");
const { StatusCodes } = require("http-status-codes");
const errorHandler = require('../handleErrors/handleError');

const getArtistById = async (req, res) => {
  const { error, value } = IdValidator(req.params);
  if (error) {
    const errors = errorHandler.JoiErrorHandler(error);
    res.status(StatusCodes.BAD_REQUEST).json({ Error: errors });
  } 
  
  else {
    try {
      const isArtist = await Artist.findById({ _id: value.id }).populate('albums','title genre releaseYear albumCover');
      if (isArtist) {
        res.status(StatusCodes.OK).json({ Artist: isArtist });
      } else {
        res
          .status(StatusCodes.NOT_FOUND)
          .send("Artist does not exist.\n You must create an artist first.");
      }
    } catch (error) {
        if(error.kind =="ObjectId")
        res.status(StatusCodes.FORBIDDEN).json({message: "ID is incorrect."});
        else
        res.status(StatusCodes.FORBIDDEN).json({message: error.message});

    }
  }
};
module.exports = getArtistById;
