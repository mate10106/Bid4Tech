import { mongooseConnect } from "@lib/mongoose";
import { Bidders } from "@models/Bidder";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { auctionProductId, bids } = req.body;
    try {
      let bidderDoc = await Bidders.findOne({ auctionProductId });

      if (!bidderDoc) {
        bidderDoc = await Bidders.create({ auctionProductId, bids });
      } else {
        bidderDoc.bids.push(...bids);
        await bidderDoc.save();
      }

      return res.json(bidderDoc);
    } catch (error) {
      console.error("Error creating/updating bid:", error);
    }
  }

  if (method === "GET") {
    if (req.query?.id) {
      try {
        const auctionProductId = req.query.id;
        const bidderDoc = await Bidders.findOne({ auctionProductId });
        const highestBidAmount = bidderDoc ? bidderDoc.highestBidAmount : 0;
        return res.json({ highestBidAmount });
      } catch (error) {
        console.error("Hiba történt:", error);
      }
    } else {
      try {
        const allBidders = await Bidders.find();
        return res.json(allBidders);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
