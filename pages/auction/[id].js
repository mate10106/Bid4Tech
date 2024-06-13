import SingleAuctionPage from "@components/SingleAuctionPage";
import { mongooseConnect } from "@lib/mongoose";
import { Auction } from "@models/AuctionProduct";

export default function AuctionPage({ auction }) {
  return (
    <>
      <SingleAuctionPage auction={auction} />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const auction = await Auction.findById(id);
  return {
    props: {
      auction: JSON.parse(JSON.stringify(auction)),
    },
  };
}
