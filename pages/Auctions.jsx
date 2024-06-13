import AuctionsFlex from "@components/AuctionsFlex";

import { mongooseConnect } from "@lib/mongoose";
import { Auction } from "@models/AuctionProduct";

export default function auctions({ auctions }) {
  return (
    <>
      <h1 className="font-bold mt-16 bg-blue-400/75 p-4 rounded-3xl text-black text-xl font-satoshi max-sm:text-center">
        Currently running Auctions
      </h1>
      <AuctionsFlex auctions={auctions} />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const auctions = await Auction.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      auctions: JSON.parse(JSON.stringify(auctions)),
    },
  };
}
