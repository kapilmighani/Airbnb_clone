const listing = require('../models/listings')

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

module.exports.createListing = async(req, res, next) =>{
    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success" , "New listing created!");
    res.redirect("/listings");
};

module.exports.renderEditeForm = async(req, res ) => {
    let {id} = req.params;
    const h = await listing.findById(id);
    if(!h){
        req.flash("error" , "listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {h});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success" , "listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let {id} =req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success" , "listing deleted!");
    res.redirect("/listings");
};