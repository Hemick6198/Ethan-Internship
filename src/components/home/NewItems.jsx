/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";
import "aos/dist/aos.css";

const NewItemsAPI__URL = `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`;

const NewItems = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // skeleton loading state array
  const skeletonArray = Array(4).fill(null);

  // Loading state and fetching API data with error catcher
  async function newItemsData() {
    try {
      const response = await axios.get(`${NewItemsAPI__URL}`);
      setNftInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    newItemsData();
  }, []);

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
  // styling for carousel
  const settings = {
    dots: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 100,
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

  return (
    <section id="section-items" className="no-bottom" data-aos="zoom-in-down">
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
              {/* cant use SkeletonCard component for this loading state */}
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
                    <Skeleton width={225} height={225} />
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
                  <NftCard nft={nft} />
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
