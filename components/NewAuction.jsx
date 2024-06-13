import React from "react";
import AuctionsFlex from "./AuctionsFlex";

const NewAuction = ({ auctions }) => {
  return (
    <>
      <h1 className="font-semibold mt-6 text-2xl font-mono max-md:text-center">
        New auction
      </h1>
      <AuctionsFlex auctions={auctions} />
    </>
  );
};

export default NewAuction;
