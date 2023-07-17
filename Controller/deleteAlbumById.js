const {Album, Artist} = require('../Model/mongooseSchema');
const {IdValidator} =require('../Validators/joiValidator');
const {StatusCodes} = require('http-status-codes');
const errorHandler= require('../handleErrors/handleError');

const deleteAlbumById= async (req, res)=>{
    const {error, value}= IdValidator(req.params);

    if(error){
        const errors= errorHandler.JoiErrorHandler(error);
        res.status(StatusCodes.BAD_REQUEST).json({Error: errors});
    }
    else{
        try {            
                const deleteData =  await Album.findByIdAndDelete({_id: value.id});
                if(deleteData)
                  res.status(StatusCodes.OK).send("Album deleted");
                  else
                  res.status(StatusCodes.EXPECTATION_FAILED).send("Album doesn't exist or already deleted");       
          
        } catch (error) {
            if(error.kind =="ObjectId")
            res.status(StatusCodes.FORBIDDEN).json({message: "ID is incorrect."});
            else
            res.status(StatusCodes.FORBIDDEN).json({message: error.message});

        }
}
}
module.exports=deleteAlbumById;