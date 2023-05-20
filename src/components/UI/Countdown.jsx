import React, { useState, useEffect } from "react";

const Countdown = ({ nft }) => {
  const { hoursLeft, minutesLeft, secondsLeft, displayTimer } = nft;
  const [updatedNft, setUpdatedNft] = useState(nft);

  // Countdown timer for NFT's
  const updateTimer = () => {
    const millisLeft = new Date(updatedNft.expiryDate) - Date.now();
    const secondsLeft = Math.floor(millisLeft / 1000) % 60;
    const minutesLeft = Math.floor(millisLeft / (1000 * 60)) % 60;
    const hoursLeft = Math.floor(millisLeft / (1000 * 60 * 60));
    const displayTimer = millisLeft > 0;

    setUpdatedNft((prevNft) => ({
      ...prevNft,
      secondsLeft,
      minutesLeft,
      hoursLeft,
      displayTimer,
    }));
  };

  // Start the timer when component mounts
  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {updatedNft.displayTimer && (
        <div className="de_countdown">
          {`${updatedNft.hoursLeft}h ${updatedNft.minutesLeft}m ${updatedNft.secondsLeft}s`}
        </div>
      )}
    </>
  );
};

export default Countdown;
