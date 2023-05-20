/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Skeleton from "../UI/Skeleton";

const API__URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`;

const NewItems = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // skeleton loading state array
  const skeletonArray = Array(4).fill(null);

  // Loading state and fetching API data with error catcher
  async function newItemsData() {
    try {
      const response = await axios.get(`${API__URL}`);
      setNftInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    newItemsData();
  }, []);

  // Start the timer when nftInfo data is available
  useEffect(() => {
    if (nftInfo.length > 0) {
      const interval = setInterval(updateTimer, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [nftInfo]);

  // Countdown timer for NFT's
  const updateTimer = () => {
    setNftInfo((prevNftInfo) => {
      return prevNftInfo.map((nft) => {
        const millisLeft = new Date(nft.expiryDate) - Date.now();
        const secondsLeft = Math.floor(millisLeft / 1000) % 60;
        const minutesLeft = Math.floor(millisLeft / (1000 * 60)) % 60;
        const hoursLeft = Math.floor(millisLeft / (1000 * 60 * 60));
        const displayTimer = millisLeft > 0;

        return {
          ...nft,
          secondsLeft,
          minutesLeft,
          hoursLeft,
          displayTimer,
        };
      });
    });
  };

  // styling for carousel
  const settings = {
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 250,
    slidesToScroll: 1,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          slidesToScroll: 2,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // Arrow styling for carousel
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", padding: "0", margin: "0" }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", padding: "0", margin: "0" }}
        onClick={onClick}
      />
    );
  }

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {isLoading && (
            <Slider {...settings}>
              {skeletonArray.map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Skeleton width={50} height={50} borderRadius={99} />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="de_countdown_skeleton">
                    <Skeleton width={105} height={30} borderRadius={50} />
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton width={282} height={275} />
                  </div>
                  <div className="nft__item_info">
                    <h4>
                      <Skeleton height={20} width="40%" />
                    </h4>
                    <div className="nft__item_price">
                      <Skeleton width={60} height={21} />
                    </div>
                    <div className="nft__item_like">
                      <span>
                        <Skeleton height={16} width={33} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
          
          {!isLoading && (
            <Slider {...settings}>
              {nftInfo.map((nft) => (
                <div key={nft.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${nft.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {nft.displayTimer && (
                      <div className="de_countdown">
                        {`${nft.hoursLeft}h ${nft.minutesLeft}m ${nft.secondsLeft}s`}
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
