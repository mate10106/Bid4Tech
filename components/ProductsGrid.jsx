import React from "react";
import ProductBox from "./ProductBox";

const ProductsGrid = ({ products }) => {
  return (
    <div className="container grid md:grid-cols-3 sm:grid-cols-2 gap-5 mt-5 border-2 rounded-lg shadow-md">
      {products.map((items, index) => (
        <ProductBox key={index} {...items} />
      ))}
    </div>
  );
};

export default ProductsGrid;
