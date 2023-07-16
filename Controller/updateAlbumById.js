const {Album, Artist} = require('../Model/mongooseSchema');
const {updateAlbumValidator} =require('../Validators/joiValidator');
const {StatusCodes} = require('http-status-codes');
const errorHandler= require("../handleErrors/handleError");
const nodeMailer= require('../Actions/nodemailer');


const updateAlbumById=async (req, res)=>{
    const {error, value}= updateAlbumValidator(req.body);
    if(error){
        const errors= errorHandler.JoiErrorHandler(error);
        res.status(StatusCodes.BAD_REQUEST).json({Error: errors});
    }
    else{
        try {
            const isArtist= await Artist.findById({_id: value.ArtistID});
            if(isArtist){
                const subject=`Album updated successfully`;
                const message=`Greeting ${isArtist.name}.
                    Your album with the ID number ${value.AlbumID} has been updated successfully,
                    You can now share your album with your fans.
                    
                    Here are the details of the updated album.
                    \n\t  Title: ${value.Title}\n \
                    \n\t Genre: ${value.Genre}.\n \
                    \n\t  Release Year: ${value.ReleaseYear}\n \

                    Best regards
                    Team Musical`
                const updatedAlbum =  await Album.findByIdAndUpdate({_id: value.AlbumID}, 
                    {
                        title:value.Title,
                        releaseYear: value.ReleaseYear,
                        genre: value.Genre,
                    });
                if(updatedAlbum){
                    nodeMailer(isArtist.email, subject, message);
                    res.status(StatusCodes.OK).send("Album updated");
                }
                  else
                  res.status(StatusCodes.EXPECTATION_FAILED).send("Album doesn't exist or already deleted");
        }
        else{
            res.status(StatusCodes.NOT_FOUND).send("Artist Id does not exist.\n You must create an artist first.")
        }
          
        } catch (error) {
            console.log(error);
            if(error.kind =="ObjectId")
            res.status(StatusCodes.FORBIDDEN).json({message: "ID is incorrect."});
            else
            res.status(StatusCodes.FORBIDDEN).json({message: error.message});

        }
}
}
module.exports=updateAlbumById;