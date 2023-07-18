const {Artist} = require('../Model/mongooseSchema');
const {updateArtistValidator} =require('../Validators/joiValidator');
const {StatusCodes} = require('http-status-codes');
const errorHandler = require('../handleErrors/handleError');
const nodeMailer =require('../Services/nodemailer');
const updateArtistById= async (req, res)=>{
    const {error, value}= updateArtistValidator(req.body);
    if(error){
        const errors= errorHandler.JoiErrorHandler(error);
        res.status(StatusCodes.BAD_REQUEST).json({Error: errors});
    }
    else{
        const file= req.file
        try {
           
                const updatedArtist =  await Artist.findOneAndUpdate({name: value.Name}, 
                    {
                        name: value.Name,
                        email:value.Email,
                        imageURL: file.path,
                        genre: value.Genre,
                    },
                     {new: true}
          );
                    const subject=`Album updated successfully`;
                    const message=`Greeting ${updatedArtist.name},
                        Your artist with the ID number ${updatedArtist._id} has been updated successfully,
                        here's a summary of your changes:
                        ${updatedArtist}
                        
                        Please login into your account and check it out.\n
                        
                        Thank you for using our service! We hope to serve you again soon.
                        
                        Best regards
                        Team Musical`
                if(updatedArtist)
                {
                    res.status(StatusCodes.OK).json({"Artist profile updated": updatedArtist});
                    nodeMailer(updatedArtist.email, subject, message);
                }
                  else
                  res.status(StatusCodes.EXPECTATION_FAILED).send("Artist doesn't exist or already deleted");          
        } 
        catch (error) {
            console.log(error);
            if(error.kind =="ObjectId")
            res.status(StatusCodes.FORBIDDEN).json({message: "ID is incorrect."});
            else
            res.status(StatusCodes.FORBIDDEN).json({message: error.message});

        }
}
}
module.exports=updateArtistById;