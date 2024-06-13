import SinglePage from "@components/SinglePage";
import { mongooseConnect } from "@lib/mongoose";
import { Product } from "@models/Product";

export default function ProductPage({ product }) {
  return (
    <>
      <SinglePage product={product} />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
