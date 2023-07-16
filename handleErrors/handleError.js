module.exports.dbSchemaErrors=(err)=>{
    let errors={name:"", email:""}
   
    if(err.message.includes("artist validation failed")){
        Object.values(err.errors).forEach(({properties} )=> {
            errors[properties.path]= properties.message;
        });
    }
    else{
      const key=Object.keys(err.keyPattern);
      if(key[0]==="name"){
        return "Name already exist";
        
    }
    else if(key[0]==="email"){
      return "Email address already exist";
    }
    }
    return errors;
}

module.exports.JoiErrorHandler=(error)=>{
    let errors="";

    var errorType = error.details[0].type;
    switch (errorType) {
      case "string.empty":
        errors +=(error.message);
        break;
      case "string.pattern.base":
        errors +=(error.message);
        break;
      case "any.required":
        errors += (error.message);
        break;
        case "string.email":
          errors += (error.message);
          break;
      default:
        errors += (error.message);
        break;
    }
    return errors;
}

module.exports.AlbumSchemaErrors=(err)=>{
  let errors={artistId:"", title:"",releaseYear:"", genre:"" }
 
  if(err.message.includes("album validation failed"|| "artist validation failed" )){
      Object.values(err.errors).forEach(({properties} )=> {
          errors[properties.path]= properties.message;
      });
  }
 
  return errors;
}

