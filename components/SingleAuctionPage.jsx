import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import HowToDo from "./HowToDo";
import Image from "next/image";

const SingleAuctionPage = ({ auction }) => {
  const { data: session } = useSession();
  const [allImg, setAllImg] = useState(auction.images);
  const [activeImages, setActiveImages] = useState(auction.images[0]);
  const [bidAmount, setBidAmount] = useState();
  const [bidder, setBidder] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertError, setAlertError] = useState("");
  const [url, setUrl] = useState("");

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  const MIN_BID_INCREMENT = 300;

  function calculateTimeRemaining() {
    const endTime = new Date(auction.endDate).getTime();
    const now = new Date().getTime();
    return Math.max(0, endTime - now);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (url.includes("/auction/")) {
      const auctionProductId = url.split("/auction/")[1];
      axios
        .get(`/api/bidding?id=${auctionProductId}`)
        .then((response) => {
          const highestBidAmount = response.data.highestBidAmount;
          setBidder({ highestBidAmount });
        })
        .catch((error) => {
          console.error("Error fetching bidding data:", error);
        });
    }
  }, [url]);

  async function saveBidding(event) {
    event.preventDefault();

    if (!session?.user) {
      setAlertError("Be kell jelentkezni!");
      return;
    } else {
      const minimumBid = auction.price + MIN_BID_INCREMENT;
      if (!bidAmount || bidAmount < minimumBid) {
        setAlertMessage(`A minimális licit összege: ${minimumBid} Ft!`);
        return;
      }

      if (bidAmount.length > 8) {
        setAlertMessage("Az összeg nem lehet 8 karakternél hosszabb!");
        return;
      }

      try {
        const data = {
          auctionProductId: auction._id,
          bids: [
            {
              bidAmount,
              name: session?.user?.id,
            },
          ],
        };
        await axios.post("/api/bidding", data);
        setAlertMessage("Sikeres licitált👌", auction.title);
        window.location.reload();
        setBidAmount("");
      } catch (error) {
        console.error("Error saving bidding data:", error);
      }
    }
  }

  return (
    <>
      <div className="mt-16 flex justify-around w-full shadow-2xl border-2 border-blue-400/95 rounded-2xl max-md:flex-col max-md:w-full">
        <div className="p-10">
          <div className="flex justify-center">
            <Image
              src={activeImages}
              className="h-40"
              alt="kep"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
          <div className="flex gap-10 mt-6 l max-sm:items-center max-md:justify-center max-sm:flex-col">
            {allImg.map((image, index) => (
              <button key={index} onMouseEnter={() => setActiveImages(image)}>
                <Image
                  src={image}
                  alt="kep"
                  loading="lazy"
                  width={70}
                  height={70}
                  className="h-20 hover:border-2 transition-transform border-blue-400/95 p-2 rounded-sm"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="p-10 flex flex-col text-center justify-between max-md:p-4 max-md:text-center max-md:gap-4">
          <div>
            <h1 className="title">{auction.title}</h1>
            <p className="text-2xl font-bold text-red-500">
              {auction.price} Ft
            </p>
            <div className="text-center">
              <p className="text-2xl font-medium">Highest bid::</p>
              <p className="text-2xl font-semibold text-blue-500">
                {bidder.highestBidAmount} Ft
              </p>
            </div>
          </div>
          <form
            onSubmit={saveBidding}
            className="text-center font-semibold font-serif text-xl mt-4"
          >
            <p>Enter an amount:</p>
            <Input
              type="number"
              className="mt-2 text-2xl max-md:text-center"
              onChange={(ev) => setBidAmount(ev.target.value)}
              min={auction.price + MIN_BID_INCREMENT}
            />
            <Button
              variant="default"
              type="submit"
              className="w-full text-lg mt-10 gap-2 max-md:w-auto max-md:p-6 max-md:rounded-xl"
            >
              Bidding
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-6 p-10 w-full shadow-2xl border-2 border-blue-400/95 rounded-2xl max-md:text-center">
        <h2 className="title">Description:</h2>
        <p className="mt-2 text-lg font-mono justify-evenly">
          {auction.description}
        </p>
        <h2 className="title mt-4">Remaining time:</h2>
        <div className="max-md:text-center text-2xl font-bold">
          <p>
            <span className="text-red-800">{days}</span> Day{" "}
            <span className="text-blue-500">{hours}</span> hour{" "}
            <span className="text-orange-600">{minutes}</span> time left.
          </p>
        </div>
      </div>
      <div className="mt-6 p-10 w-full shadow-2xl border-2 border-blue-400/95 rounded-2xl max-md:text-center">
        <HowToDo />
      </div>
      {alertMessage && (
        <div
          className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={() => setAlertMessage(!alertMessage)}
        >
          <Alert className="p-16 cursor-pointer">
            <AlertTitle className="title text-center">Information</AlertTitle>
            <AlertDescription className="text-center mb-4 text-lg font-serif">
              {alertMessage}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {alertError && (
        <div
          className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={() => setAlertError(!alertError)}
        >
          <Alert className="p-16 cursor-pointer">
            <AlertTitle className="title text-center">Information</AlertTitle>
            <AlertDescription className="text-center mb-4 text-lg font-serif">
              {alertError}
            </AlertDescription>
            <AlertDescription className="text-center">
              <p className="text-red-800 italic text-sm">
                *To log in, click on the log in menu tab
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default SingleAuctionPage;
