/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";

const ExploreNFT__API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

const ExploreItems = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [filter, setFilter] = useState("");
  // updates the display count and how many to add to screen
  const [displayCount, setDisplayCount] = useState(8);
  const [hasMoreData, setHasMoreData] = useState(true);
  const incrementCount = 4;
  // Skeleton Loading State
  const [isLoading, setIsLoading] = useState(true);
  const skeletonArray = Array(8).fill(null);

  // Fetch the API Data and useState it.
  async function exploreNftData() {
    try {
      const response = await axios.get(`${ExploreNFT__API}`);
      setNftInfo(response.data);
      // Checking if there is any more data that can be loaded
      if (response.data.length < displayCount + incrementCount) {
        setHasMoreData(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    exploreNftData();
  }, []);

  // Sorts the NFT's
  async function sortNft() {
    setIsLoading(true);
    try {
      let apiUrl = ExploreNFT__API;
      if (filter === "price_low_to_high") {
        apiUrl += "?filter=price_low_to_high";
      } else if (filter === "price_high_to_low") {
        apiUrl += "?filter=price_high_to_low";
      } else if (filter === "likes_high_to_low") {
        apiUrl += "?filter=likes_high_to_low";
      }
      const response = await axios.get(apiUrl);
      setNftInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sorting data:", error);
      setIsLoading(false);
    }
  }

  const FilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    sortNft();
  }, [filter]);

  // Loads more NFT's
  const LoadMore = () => {
    const newDisplayCount = displayCount + incrementCount;
    setDisplayCount(newDisplayCount);

    if (newDisplayCount >= nftInfo.length) {
      setHasMoreData(false);
    }
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          defaultValue=""
          onChange={FilterChange}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading &&
        skeletonArray.map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width={50} height={50} borderRadius={99} />
                <i className="fa fa-check"></i>
              </div>
              <div className="de_countdown_skeleton">
                <Skeleton width={97} height={30} />
              </div>
              <div className="nft__item_wrap">
                <div className="lazy nft__item_preview">
                  <Skeleton width={264} height={264} />
                </div>
              </div>
              <div className="nft__item_info">
                <h4>
                  <Skeleton width={125} height={18} />
                </h4>
                <div className="nft__item_price">
                  <Skeleton width={75} height={11} />
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>
                    <Skeleton width={8} height={8} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      {!isLoading && (
        <>
          {nftInfo.slice(0, displayCount).map((nft, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard nft={nft} />
            </div>
          ))}
        </>
      )}
      {hasMoreData && (
        <div className="col-md-12 text-center">
          <button id="loadmore" className="btn-main lead" onClick={LoadMore}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
