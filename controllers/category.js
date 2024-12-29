const Listing = require("../models/listings");

module.exports.categories = async (req, res) => {
    const selectedCategory = req.params.category;  // Get category from URL params
    let listings;

    // Filter listings based on selected category
    if (selectedCategory) {
        listings = await Listing.find({ category: selectedCategory });
    } else {
        listings = await Listing.find(); // Show all listings if no category is selected
    }

    // Get all available categories for the filter buttons
    const categories = await Listing.distinct('category');

    // Render the 'category' EJS page with listings and categories data
    res.render("category", { listings, categories, selectedCategory });
};
