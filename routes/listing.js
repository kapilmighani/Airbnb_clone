const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {isLoggedIn, isOwner, validatelisting} = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const storage = require('../cloudConfig.js');
const upload = multer({ storage });


router
.route('/')
.get( wrapAsync (listingController.index))
// .post(isLoggedIn, validatelisting, wrapAsync (listingController.createListing));
.post( upload.single('listing[image][url]'), (req, res) => {
    res.send(req.file);
})

//new Route
router.get('/new',isLoggedIn, wrapAsync (listingController.renderNewForm));

router
.route('/:id')
.get(wrapAsync (listingController.showListing))
.delete(isLoggedIn,isOwner, wrapAsync (listingController.deleteListing))
.put(isLoggedIn,isOwner, validatelisting, wrapAsync (listingController.updateListing));

//edite route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync (listingController.renderEditeForm));

module.exports = router;