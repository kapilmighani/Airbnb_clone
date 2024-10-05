const express = require('express')
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const listing = require('./models/listings');
const path = require('path');
const { escape } = require('querystring');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema }= require('./schema.js');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

main()
.then(() =>{
    console.log("mongoose was connected");
})
.catch((err) =>{
    console.log("mongoose was not connected",err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
};

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "/public")));

app.get('/', async(req, res) => {
    res.send("this is home root")
})

const validatelisting = (req, res, next ) => {
    let {error} = listingSchema.validate(req.body);

    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

app.get('/listings', wrapAsync ( async(req, res ) => {
    const listings = await listing.find({});
    res.render("listings/index.ejs", {listings})
}));

app.post('/listing/create', validatelisting, wrapAsync ( async(req, res, next) =>{
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
}));


app.get('/listing/:id', wrapAsync ( async(req, res ) =>{
    let {id} = req.params;
    const list = await listing.findById( id )
    res.render("listings/show.ejs", {list});
}));

app.get('/listings/new', wrapAsync ( async(req, res ) =>{
    res.render("listings/new.ejs");
}));

app.get('/listing/:id/edit', wrapAsync ( async(req, res ) => {
    let {id} = req.params;
    const h = await listing.findById(id);

    res.render("listings/edit.ejs", {h});

}));

app.put('/listing/:id', validatelisting, wrapAsync ( async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.data});
    res.redirect(`/listing/${id}`);

}));

app.delete('/listings/:id', wrapAsync ( async (req, res) => {
    let {id} =req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

app.all('*', (req, res, next) => {
    next( new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) =>{
    let {statusCode = 500 , message = "something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});

app.listen(8000 , (req, res ) =>{
    console.log("server is listing to 8000");
});