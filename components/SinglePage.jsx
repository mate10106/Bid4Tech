import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CartContext } from "./CartContext";
import axios from "axios";
import Image from "next/image";

const SinglePage = ({ product }) => {
  const [allImg, setAllImg] = useState(product.images);
  const [activeImages, setActiveImages] = useState(product.images[0]);
  const { addProduct } = useContext(CartContext);
  const [parameter, setParameter] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (url.includes("/product/")) {
      const productId = url.split("/product/"[1]);
      axios.get(`/api/category?_id=${productId}`).then((response) => {
        setParameter(response.data);
      });
    }
  }, [url]);

  return (
    <>
      <div className="mt-16 flex w-full justify-around shadow-2xl border-2 border-blue-400/95 rounded-2xl max-md:flex-col max-md:w-full">
        <div className="p-10">
          <div className="flex justify-center m-0">
            <Image
              src={activeImages}
              alt="kep"
              className="h-48 w-auto "
              loading="lazy"
              width={300}
              height={600}
            />
          </div>
          <div className="flex gap-10 mt-6 max-sm:flex-col max-sm:justify-center max-sm:items-center">
            {allImg.map((image, index) => (
              <button key={index} onMouseEnter={() => setActiveImages(image)}>
                <Image
                  src={image}
                  alt="kep"
                  loading="lazy"
                  width={70}
                  height={70}
                  className="h-20 w-auto hover:bg-teal-500/45 transition-transform p-2 rounded-2xl"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between p-10 m-2 max-md:p-4 max-md:text-center max-md:gap-4">
          <div>
            <h1 className="title">{product.title}</h1>
            <p className="text-2xl font-bold ">{product.price} Ft</p>
            <p className="text-xl">
              <span className="font-semibold">{product.amount}</span> piece in
              stock
            </p>
          </div>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 max-md:self-center">
            <div className="flex gap-2 items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9 bg-teal-500/45 rounded-2xl p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <span className="text-sm">Secure payment</span>
            </div>
            <div className="flex gap-2 items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-9 h-9 bg-teal-500/45 rounded-2xl p-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span className="text-sm">Free shipping</span>
            </div>
            <div className="flex gap-2 items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-9 h-9 bg-teal-500/45 rounded-2xl p-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
                />
              </svg>

              <span className="text-sm">free return</span>
            </div>
            <div className="flex gap-2 items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-9 h-9 bg-teal-500/45 rounded-2xl p-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>
              <span className="text-sm">security certificate</span>
            </div>
          </div>
          <div>
            <Button
              variant="default"
              className="w-full text-lg gap-2 max-md:w-auto max-md:p-6 max-md:rounded-xl"
              onClick={() => addProduct(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 shadow-2xl border-2 border-blue-400/95 rounded-2xl p-10 w-full">
        <h2 className="title">Description:</h2>
        <p className="mt-2 text-lg font-mono justify-evenly">
          {product.description}
        </p>
      </div>
    </>
  );
};

export default SinglePage;
