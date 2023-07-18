const Joi= require('joi');

const albumValidator=(data)=>{
    schema = Joi.object({
        ArtistID:Joi.string()
        .trim()
        .required()
        .messages({
            'any.required': `Artist ID is required`,
        }),

        Title:Joi.string()
        .required()
        .trim()
        .messages({
            'any.required': `Title is required`,
            'string.base': `Title must be text`,
        }),
        Genre:Joi.string()
        .required()
        .trim()
        .messages({
            'any.required':`Genre is required`,
            'string.base': `Genre must be a text`
        }),
        ReleaseYear:Joi.number()
        .required()
        .messages({
            'any.required':`Release Yera is required`,
            'number.base': `Release Year must be a number`
        }),
    })
    return schema.validate(data);
}


const artistValidator=(data)=>{
    schema=Joi.object({
        Name:Joi.string()
        .min(3)
        .max(50)
        .required()
        .trim()
        .messages({
            "string.empty": `"Name" cannot be empty or whitespace `,
            "string.min":   "'Name' should have at least 3 characters",
            "string.max":   "'Name' can only contain upto 50 characteres ",
            "any.required":    "Artist name field is mandatory.",
            'string.base': `Name must be a text`
        }),
        Email:Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            "string.empty":"Email address cannot be blank!",
            "string.email":"Invalid email format! Please enter valid email address.",
            "any.required":"Please provide an email for the Artist.",
            

        }),
        Genre:Joi.string()
        .required()
        .trim()
        .messages({
            'any.required':'Genre of your music is required',
            'string.base': `'Genre' must be in string form.`,
        }),
        ImageUrl:Joi.string()
    })
    return schema.validate(data);
}
const IdValidator=(data)=>{
    schema=Joi.object({
        id:Joi.string()
        .required()
        .trim()
        .messages({
            'any.required':'ID is required',
            'string.base': `'ID' must be in string form.`,
        })
    })
    return schema.validate(data);
}
const updateAlbumValidator=(data)=>{
    schema = Joi.object({
        AlbumID:Joi.string()
        .trim()
        .required()
        .messages({
            'any.required': `Album ID is required`,
        }),
        Title:Joi.string()
        .trim()
        .messages({
            'string.base': `Title must be text`,
        }),
        Genre:Joi.string()
        .trim()
        .messages({
            'string.base': `Genre must be a text`
        }),
        ReleaseYear:Joi.number()
        .messages({
            'number.base': `Release Year must be a number`
        }),
    })
    return schema.validate(data);
}

const updateArtistValidator=(data)=>{
    schema=Joi.object({
        Name:Joi.string()
        .min(3)
        .max(50)
        .trim()
        .messages({
            "string.empty": `"Name" cannot be empty or whitespace `,
            "string.min":   "'Name' should have at least 3 characters",
            "string.max":   "'Name' can only contain upto 50 characteres ",
            'string.base': `Name must be a text`
        }),
        Email:Joi.string()
        .email()
        .trim()
        .messages({
            "string.empty":"Email address cannot be blank!",
            "string.email":"Invalid email format! Please enter valid email address.",  
        }),
        Genre:Joi.string()
        .trim()
        .messages({
            'string.base': `'Genre' must be in string form.`,
        }),
        ImageUrl:Joi.string()
    })
    return schema.validate(data);
}

module.exports={artistValidator,updateArtistValidator, albumValidator, IdValidator, updateAlbumValidator};