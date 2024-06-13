import mongoose, { Schema, model, models } from "mongoose";

const BidderSchema = new Schema({
  auctionProductId: {
    type: mongoose.Types.ObjectId,
    ref: "Auction",
  },
  bids: [
    {
      bidAmount: {
        type: Number,
        required: true,
      },
      name: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  highestBidAmount: {
    type: Number,
    default: 0,
  },
});

BidderSchema.pre("save", function (next) {
  if (this.isModified("bids")) {
    let highestBidAmount = 0;
    this.bids.forEach((bid) => {
      if (bid.bidAmount > highestBidAmount) {
        highestBidAmount = bid.bidAmount;
      }
    });
    this.highestBidAmount = highestBidAmount;
  }
  next();
});

export const Bidders = models.Bidders || model("Bidders", BidderSchema);
