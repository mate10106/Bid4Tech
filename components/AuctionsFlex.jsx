import React from "react";
import AuctionsFeatured from "./AuctionsFeatured";

const AuctionsFlex = ({ auctions }) => {
  return (
    <div className="flex flex-col gap-8 p-10 items-center">
      {auctions.map((items, index) => (
        <AuctionsFeatured key={index} {...items} />
      ))}
    </div>
  );
};

export default AuctionsFlex;
