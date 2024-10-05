const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    comment: String,
    rating:{
        type: String,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        defualt: Date.now(),
    },
});

module.exports = mongoose.model("Review" , reviewSchema);