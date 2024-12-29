const { application } = require('express');
const mongoose = require('mongoose');
const Review = require('./review.js')
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    description: {
      type: String,
    },
    image: {
      url: String,
      filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    category: {
      type: String,
      enum: ["Trending", "Rooms", "Iconic Cities", "Mountain", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Boat", "Doms"],
    },
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({ _id: {$in: listing.reviews}})
  }
});

const listing = mongoose.model("listing",listingSchema);

module.exports = listing;
