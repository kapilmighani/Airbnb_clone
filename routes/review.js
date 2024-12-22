const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError.js');
const wrapAsync = require('../utils/wrapAsync.js');
const { reviewSchema }= require('../schema.js');
const listing = require('../models/listings');



const validateReview = (req, res, next ) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};


router.post('/', validateReview,  wrapAsync ( async (req, res) => {

    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash("success" , "New review created!");
    res.redirect(`/listings/${Listing._id}`)
}));

router.delete('/:reviewId', 
    wrapAsync( async(req, res ) => {
        let {id, reviewId} = req.params;

        await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash("success" , "review deleted!");
        res.redirect(`/listings/${id}`);
}));

module.exports = router;