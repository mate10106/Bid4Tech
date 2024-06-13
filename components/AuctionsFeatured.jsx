import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const AuctionsFeatured = ({ _id, title, price, images, endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const endTime = new Date(endDate).getTime();
    const now = new Date().getTime();
    return Math.max(0, endTime - now);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeRemaining]);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  const url = "/auction/" + _id;
  return (
    <div className="border-2 shadow-xl border-blue-400/95 rounded-2xl p-10 w-full">
      <div className="flex justify-between items-center gap-40 max-lg:flex-col max-lg:gap-2 max-lg:text-center max-lg:p-2">
        <div>
          <h2 className="title">{title}</h2>
          <div className="font-semibold">
            <p className="font-bold text-lg text-red-500">{price}Ft</p>
            <div>
              <p>
                {days} day {hours} hours {minutes} minute left.
              </p>
            </div>
          </div>
          <Link href={url}>
            <Button className="mt-2">Bidding</Button>
          </Link>
        </div>
        <Link href={url}>
          <Image
            src={images[0]}
            alt="kep"
            className="w-64"
            width={160}
            height={160}
          />
        </Link>
      </div>
    </div>
  );
};

export default AuctionsFeatured;
