const { Album, Artist } = require("../Model/mongooseSchema");
const { StatusCodes } = require("http-status-codes");
const errorHandler = require("../handleErrors/handleError");
const { IdValidator } = require("../Validators/joiValidator");

const getAlbumById = async (req, res) => {
  const { error, value } = IdValidator(req.params);
  if (error) {
    const errors = errorHandler.JoiErrorHandler(error);
    res.status(StatusCodes.BAD_REQUEST).json({ Error: errors });
  } else {
    try {
      const album = await Album.findById({ _id: value.id });
      if (album) {
        const isArtist = await Artist.findById({ _id: album.artistId });
        if (isArtist) res.status(StatusCodes.OK).json({ Album: album });
        else
          res
            .status(StatusCodes.NOT_FOUND)
            .send("Artist does not exist.\n You must create an artist first.");
      } else {
        res
          .status(StatusCodes.EXPECTATION_FAILED)
          .send("Album doesn't exist or already deleted");
      }
    } catch (error) {
        if(error.kind =="ObjectId")
        res.status(StatusCodes.FORBIDDEN).json({message: "ID is incorrect."});
        else
        res.status(StatusCodes.FORBIDDEN).json({message: error.message});

    }
  }
};
module.exports = getAlbumById;
