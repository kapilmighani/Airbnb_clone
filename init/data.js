const mongoose = require("mongoose");

// MongoDB connection URL
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Mongoose models
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");  // Assuming you have a 'review.js' model

// The data to be inserted into the database
const initData = {
  data: [
    {
      title: "Cozy Beachfront Cottage",
      description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
      price: 1500,
      location: "Malibu, California, USA",
      country: "United States",
      category: "Trending",
      geometry: { type: "Point", coordinates: [-118.7798, 34.0259] },
    },
    {
      title: "Modern Loft in Downtown",
      description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
      price: 1200,
      location: "New York City, New York, USA",
      country: "United States",
      category: "Iconic Cities",
      geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
    },
    {
      title: "Mountain Retreat",
      description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
      price: 1000,
      location: "Aspen, Colorado, USA",
      country: "United States",
      category: "Mountain",
      geometry: { type: "Point", coordinates: [-106.837, 39.1911] },
    },
    {
      title: "Historic Villa in Tuscany",
      description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
      price: 2500,
      location: "Florence, Tuscany, Italy",
      country: "Italy",
      category: "Castles",
      geometry: { type: "Point", coordinates: [11.2558, 43.7696] },
    },
    {
      title: "Secluded Treehouse Getaway",
      description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
      price: 800,
      location: "Portland, Oregon, USA",
      country: "United States",
      category: "Camping",
      geometry: { type: "Point", coordinates: [-122.6765, 45.5231] },
    },
    {
      title: "Beachfront Paradise",
      description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
      price: 2000,
      location: "Cancun, Mexico",
      country: "Mexico",
      category: "Amazing Pools",
      geometry: { type: "Point", coordinates: [-86.8475, 21.1619] },
    },
    {
      title: "Rustic Cabin by the Lake",
      description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
      price: 1300,
      location: "Lake Tahoe, California, USA",
      country: "United States",
      category: "Farms",
      geometry: { type: "Point", coordinates: [-120.044, 39.0968] },
    },
    {
      title: "Cozy Mountain Lodge",
      description: "This mountain lodge offers breathtaking views and a serene retreat in the heart of nature.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
      price: 1100,
      location: "Vail, Colorado, USA",
      country: "United States",
      category: "Mountain",
      geometry: { type: "Point", coordinates: [-106.3744, 39.6403] },
    },
    {
      title: "Luxury Beachfront Villa",
      description: "Experience the pinnacle of luxury with this beachfront villa that offers stunning views and amenities.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" },
      price: 3500,
      location: "Bora Bora, French Polynesia",
      country: "French Polynesia",
      category: "Trending",
      geometry: { type: "Point", coordinates: [-151.7415, -16.5004] },
    },
    {
      title: "Modern Urban Penthouse",
      description: "Stay in this spacious penthouse with panoramic views of the city skyline.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506748686219-3f03e9d6fd93?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8cGVudGhvdXNlfGVufDB8fHx8fDE2NTg2MzU1Njg&ixlib=rb-1.2.1&q=80&w=1080" },
      price: 4000,
      location: "Chicago, Illinois, USA",
      country: "United States",
      category: "Iconic Cities",
      geometry: { type: "Point", coordinates: [-87.6298, 41.8781] },
    },
    {
      title: "Countryside Villa",
      description: "Relax and unwind in this rustic villa, perfect for a peaceful getaway surrounded by nature.",
      image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" },
      price: 2200,
      location: "Provence, France",
      country: "France",
      category: "Castles",
      geometry: { type: "Point", coordinates: [5.0422, 43.8348] },
    },
    // Continue creating similar objects for other categories such as "Camping", "Amazing Pools", "Farms", etc.
    // After 110 listings, you can repeat categories and locations like "Paris", "London", "Dubai", "Sydney", etc., with variations in price and descriptions.
  ]
};

main()
  .then(() => {
    console.log("Connected to DB");
    initDB();  // Start the database initialization after connecting
  })
  .catch((err) => {
    console.log("Error while connecting to DB: ", err);
  });

// Main function to connect to MongoDB
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Function to delete old listings and insert new data
const initDB = async () => {
  try {
    // Step 1: Delete old listings
    await Listing.deleteMany({});
    console.log("Old data deleted");

    // Step 2: Modify initData (if needed), ensure the owner field is correctly set
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("67679560947d5fb74c9a4208"),  // Correct usage of ObjectId
    }));

    // Step 3: Insert new listings data
    await Listing.insertMany(initData.data);
    console.log("New data was initialized");

    // Optionally: Remove related reviews if necessary
    await Review.deleteMany({});  // Delete all reviews (be cautious with this approach)
    console.log("Related reviews were deleted");

  } catch (err) {
    console.error("Error while initializing database: ", err);
  }
};
