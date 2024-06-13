import React from "react";

const HowToDo = () => {
  return (
    <>
      <h1 className="title mt-4 max-md:text-center">How does it work?</h1>
      <div className="flex gap-16 mt-6 max-md:flex-col max-md:items-center max-lg:gap-2">
        <div className="border-2 p-8 max-w-56 max-sm:max-w-full hover:border-blue-400 transition-colors">
          <p className="text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </p>
          <p className="font-semibold">Log in!</p>
          <p className="text-black/55">
            Log into your account to participate in the bidding. By clicking on
            the Auction menu, you can find our current auctions.
          </p>
        </div>
        <div className="border-2 p-8 max-w-56 max-sm:max-w-full hover:border-blue-400 transition-colors">
          <p className="text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              className="w-6 h-6"
            >
              <title />
              <path d="M20,14a5,5,0,0,0-1.54-3.6L19.13,5H6.22l-.4-2H2V5H4.18L5.8,13.11A2.49,2.49,0,0,0,6.5,18H12v0a4.93,4.93,0,0,0,5.75.19l3.54,3.54,1.41-1.41-3.54-3.54A5,5,0,0,0,20,14ZM16.58,9.28A4.93,4.93,0,0,0,15,9V7h1.87ZM7.82,13l-.4-2H9v2ZM11,11h0l0,0Zm0-2V7h2V9ZM9,7V9H7l-.4-2ZM6,15.5a.5.5,0,0,1,.5-.5h3.6a4.94,4.94,0,0,0,.32,1H6.5A.5.5,0,0,1,6,15.5ZM15,17a3,3,0,1,1,3-3A3,3,0,0,1,15,17Z" />
              <rect height="2" width="2" x="7" y="19" />
            </svg>
          </p>
          <p className="font-semibold">Choose a product!</p>
          <p className="text-black/55">
            After clicking the bid button, the product page will appear. There
            you can find a detailed description of the product.
          </p>
        </div>
        <div className="border-2 p-8 max-w-56 max-sm:max-w-full hover:border-blue-400 transition-colors">
          <p className="text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
          </p>
          <p className="font-semibold">Place a bid!</p>
          <p className="text-black/55">
            You must outbid the highest bid by at least 400 HUF!{" "}
          </p>
        </div>
        <div className="border-2 p-8 max-w-56 max-sm:max-w-full hover:border-blue-400 transition-colors">
          <p className="text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </p>
          <p className="font-semibold">You have 72 hours to pay!</p>
          <p className="text-black/55">
            If you don't pay, you will be banned from future auctions!
          </p>
        </div>
      </div>
    </>
  );
};

export default HowToDo;
