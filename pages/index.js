import Featured from "@components/Featured";
import HowToDo from "@components/HowToDo";
import NewAuction from "@components/NewAuction";
import NewProduct from "@components/NewProduct";
import { mongooseConnect } from "@lib/mongoose";
import { Auction } from "@models/AuctionProduct";
import { Product } from "@models/Product";

export default function Home({ featuedProduct, products, auctions }) {
  return (
    <div>
      <Featured featuedProduct={featuedProduct} />
      <NewProduct products={products} />
      <HowToDo />
      <NewAuction auctions={auctions} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65c8ff7c5299a51c7a587260";
  await mongooseConnect();
  const featuedProduct = await Product.findById(featuredProductId);
  const products = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 9,
  });
  const auctions = await Auction.find({}, null, {
    sort: { _id: -1 },
    limit: 4,
  });
  return {
    props: {
      featuedProduct: JSON.parse(JSON.stringify(featuedProduct)),
      products: JSON.parse(JSON.stringify(products)),
      auctions: JSON.parse(JSON.stringify(auctions)),
    },
  };
}
