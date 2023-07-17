const { Artist } = require("../Model/mongooseSchema");
const { artistValidator } = require("../Validators/joiValidator");
const {StatusCodes}= require ('http-status-codes');
const errorHandler= require('../handleErrors/handleError');
const fs = require('fs');
const nodeMailer = require('../Actions/nodemailer');


const createArtist = async (req, res) => {
   
    
    const file= req.file
    const { error, value } = artistValidator(req.body);
    const subject=`Welcome to Music Streaming App`;
    const message=`Greeting ${value.Name}.
                    Your account has been successfully created on our platform.
                    Please login using your credentials and enjoy music streaming services.
                    
                    Best regards
                    Team Musical`
  if (error) {
    const errors= errorHandler.JoiErrorHandler(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
  }
  else{
    try {
        const artist = new Artist({
            name:value.Name.toLowerCase(),
            email: value.Email.toLowerCase(),
            imageURL:file.path,
            genre:value.Genre,
            createdAt:new Date()

        });
        let newArtist= await artist.save();
        res.status(StatusCodes.CREATED).json({"Registration successful": newArtist})
        nodeMailer(value.Email, subject,message);
    } catch (error) {
        
        if (file) {
                fs.unlinkSync(file.path);
        }
            const errors= errorHandler.dbSchemaErrors(error);
        res.status(StatusCodes.FORBIDDEN).json({message :errors})   
    }
  }
};
module.exports=createArtist;