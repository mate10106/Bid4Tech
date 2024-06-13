import ProductsGrid from "@components/ProductsGrid";
import { mongooseConnect } from "@lib/mongoose";
import { Product } from "@models/Product";

export default function ProductsPage({ products }) {
  return (
    <>
      <h1 className="font-bold mt-16 bg-slate-700 p-4 rounded-3xl text-yellow-50 text-xl font-satoshi">
        All products
      </h1>
      <ProductsGrid products={products} />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
