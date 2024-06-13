import { useContext } from "react";
import { Button } from "./ui/button";
import { CartContext } from "./CartContext";
import Link from "next/link";
import Image from "next/image";

const ProductBox = ({ _id, title, price, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <>
      <div className="bg-white p-5 rounded-lg text-center flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform">
        <Link href={url}>
          <Image
            src={images[0]}
            alt="nincsen kep feltoltve"
            className="max-w-ful max-h-40"
            loading="lazy"
            width={200}
            height={200}
          />
          <h2 className="text-lg font-satoshi">{title}</h2>
          <p className="font-bold">{price}Ft</p>
        </Link>
        <Button
          variant="default"
          className="styled_button mt-2 flex items-center gap-2"
          onClick={() => addProduct(_id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
          Basket
        </Button>
      </div>
    </>
  );
};

export default ProductBox;
