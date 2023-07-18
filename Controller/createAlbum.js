const {Album, Artist} = require('../Model/mongooseSchema');
const {albumValidator} =require('../Validators/joiValidator');
const {StatusCodes} = require('http-status-codes');
const  errorHandler = require('../handleErrors/handleError');
const nodeMailer = require('../Services/nodemailer');
const fs = require('fs');


const createAlbum= async (req, res)=>{
    const {error, value}= albumValidator(req.body);
    var file= req.file;
    if(error)
    {
        const errors= errorHandler.JoiErrorHandler(error) ;
      res.status(StatusCodes.BAD_REQUEST).json({"Error message": errors});
    }
    else{
        try {
            const isArtist= await Artist.findById({_id: value.ArtistID});
            if(isArtist){
                const subject=`New Album created successfully`;
                const message=`Greeting ${isArtist.name},
                    Your new album has been successfully added to your account,
                    You can now share your album with your fans.
                    
                    Here are the details of the album.
                    Title: ${value.Title}
                    Release Year: ${value.ReleaseYear}
                    Genre: ${value.Genre}.

                    Best regards
                    Team Musical`
            const album= new Album({
                artistId:value.ArtistID,
                title: value.Title,
                releaseYear: value.ReleaseYear,
                albumCover: file.path,
                genre:value.Genre
            })
            let newAlbum= await album.save()
               
                 await  Artist.updateOne(
                    {_id: value.ArtistID},
                    {$addToSet: {albums:newAlbum._id}}
                    )
                    nodeMailer(isArtist.email, subject, message);
                    res.json({"Album created successfully": newAlbum}).status(StatusCodes.CREATED);
                
        }
        else{
            res.status(StatusCodes.NOT_FOUND).send("Artist Id does not exist. You must create an artist first.")
        }
        }
         catch (error) {
    
            if (file) {
                fs.unlinkSync(file.path);
         }
                    const errors= errorHandler.AlbumSchemaErrors(error);
            res.status(StatusCodes.FORBIDDEN).json({"Error message" : errors});
        }
    }
}
module.exports=createAlbum;