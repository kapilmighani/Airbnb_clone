const { query } = require('express');
const listing = require('../models/listings')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index =  async(req, res ) => {
    const listings = await listing.find({});
    res.render("listings/index.ejs", {listings})
};

module.exports.renderNewForm = async(req, res ) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res ) =>{
    let {id} = req.params;
    const list = await listing.findById(id).populate({path: "reviews", populate : {path: "author"},}).populate("owner");
    if(!list){
        req.flash("error" , "listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {list});
};

module.exports.createListing = async (req, res, next) => {
    try {
        // Fetch geocoding data for the specified location
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            })
            .send();

        // if (response && response.body && response.body.features && response.body.features.length > 0) {
        //     const location = response.body.features[0].geometry; // Extract the location geometry
        //     console.log("Geocoding response:", location);
        // } else {
        //     throw new Error("Geocoding failed to return valid data");
        // }

        // // Check if a file is uploaded
        // if (!req.file) {
        //     req.flash("error", "Please upload an image.");
        //     return res.redirect("/listings/new"); // Redirect back to the form if no file is uploaded
        // }

        // Extract file details
        let url = req.file.path;
        let filename = req.file.filename;

        // Create a new listing
        const newListing = new listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        newListing.geometry = response.body.features[0].geometry; 

        // Save the new listing
        let savedlisting = await newListing.save();
        req.flash("success", "New listing created!");
        res.redirect("/listings");

    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "Something went wrong, please try again!");
        res.redirect("/listings/new");
    }
};



module.exports.renderEditeForm = async(req, res ) => {
    let {id} = req.params;
    const h = await listing.findById(id);
    if(!h){
        req.flash("error" , "listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = h.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_200");
    res.render("listings/edit.ejs", {h, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the listing and update non-image fields
        const updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

        // If an image file is uploaded, update the image field
        if (req.file) {
            const url = req.file.path;
            const filename = req.file.filename;
            updatedListing.image = { url, filename };
            await updatedListing.save();
        }

        req.flash("success", "Listing updated successfully!");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Error updating listing:", err);
        req.flash("error", "Something went wrong while updating the listing. Please try again.");
        res.redirect("/listings");
    }
};

module.exports.deleteListing = async (req, res) => {
    let {id} =req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success" , "listing deleted!");
    res.redirect("/listings");
};