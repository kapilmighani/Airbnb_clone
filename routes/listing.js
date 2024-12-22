const express = require("express");
const router = express.Router();
const listing = require('../models/listings');
const { listingSchema}= require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn} = require('../middleware.js');


const validatelisting = (req, res, next ) => {
    let {error} = listingSchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


router.get('/', wrapAsync ( async(req, res ) => {
    const listings = await listing.find({});
    res.render("listings/index.ejs", {listings})
}));

router.post('/create',isLoggedIn, validatelisting, wrapAsync ( async(req, res, next) =>{
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    req.flash("success" , "New listing created!");
    res.redirect("/listings");
}));

router.get('/new',isLoggedIn, wrapAsync ( async(req, res ) =>{
    res.render("listings/new.ejs");
}));

router.get('/:id', wrapAsync ( async(req, res ) =>{
    let {id} = req.params;
    const list = await listing.findById(id).populate("reviews");
    if(!list){
        req.flash("error" , "listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {list});
}));


router.get('/:id/edit',isLoggedIn, wrapAsync ( async(req, res ) => {
    let {id} = req.params;
    const h = await listing.findById(id);
    if(!h){
        req.flash("error" , "listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {h});

}));

router.put('/:id',isLoggedIn, validatelisting, wrapAsync ( async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success" , "listing Updated!");
    res.redirect(`/listings/${id}`);

}));

router.delete('/:id',isLoggedIn, wrapAsync ( async (req, res) => {
    let {id} =req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success" , "listing deleted!");
    res.redirect("/listings");
}));


module.exports = router;