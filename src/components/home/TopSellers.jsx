import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

import "aos/dist/aos.css";

const topSellersAPI = `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`;

const TopSellers = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonArray = Array(12).fill(null);

  async function topSellersData() {
    try {
      const response = await axios.get(`${topSellersAPI}`);
      setNftInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    topSellersData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            className="col-md-12"
            data-aos="flip-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="750"
          >
            <ol className="author_list">
              {isLoading && (
                <>
                  {skeletonArray.map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className="lazy pp-author">
                          <Skeleton width={50} height={50} borderRadius={99} />
                          <i className="fa fa-check"></i>
                        </div>
                      </div>
                      <div className="author_list_info">
                        <h4>
                          <Skeleton width={123} height={21} />
                        </h4>
                        <span>
                          <Skeleton width={35} height={15} />{" "}
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              )}
              {!isLoading && (
                <>
                  {nftInfo.map((user) => (
                    <li key={user.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${user.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={user.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${user.authorId}`}>
                          {user.authorName}
                        </Link>
                        <span>{user.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
