import { mongooseConnect } from "@lib/mongoose";
import { Auction } from "@models/AuctionProduct";

export default async function (req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Auction.findOne({ _id: req.query?.id }));
    } else {
      res.json(await Auction.find());
    }
  }
}
