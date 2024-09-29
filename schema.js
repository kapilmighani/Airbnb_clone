const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image: joi.object({
            filename: joi.string().allow("", null),
            url: joi.string().default("(link unavailable)").allow("", null),
        }),      
    }).required()
})
