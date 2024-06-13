import mongoose, { Schema, model, models } from "mongoose";

const AuctionProduct = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export const Auction = models.Auction || model("Auction", AuctionProduct);
