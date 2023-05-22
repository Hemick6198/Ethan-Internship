import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ItemDetails__API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=`;

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function nftItemDetailsData() {
    try {
      const { data } = await axios.get(`${ItemDetails__API}${nftId}`);
      setNftInfo(data);
    } catch (error) {
      console.error("Failed to Fetch Data", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    nftItemDetailsData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animations
  AOS.init({
    offset: 25,
    easing: "ease",
    duration: 500,
    mirror: false,
    delay: 250,
    once: true,
  });

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {isLoading && (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width={550} height={450} />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        <Skeleton width={400} height={40} />
                      </h2>
                      <div className="item_info_counts">
                        <Skeleton width={80} height={26} />
                        <Skeleton width={80} height={26} />
                      </div>
                      <>
                        <Skeleton width={525} height={100} />
                      </>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={99}
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={65} height={21} />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width={50}
                                height={50}
                                borderRadius={99}
                              />
                              <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton width={65} height={21} />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>
                          <Skeleton width={50} height={15} />
                        </h6>
                        <div className="nft-item-price">
                          <Skeleton width={24} height={24} />
                          <span>
                            <Skeleton width={65} height={24} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!isLoading && (
                <>
                  <div className="col-md-6 text-center" data-aos="fade-left">
                    <img
                      src={nftInfo.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 data-aos="fade-right">Rainbow Style #{nftInfo.tag}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views" data-aos="fade-right">
                          <i className="fa fa-eye" ></i>
                          {nftInfo.views}
                        </div>
                        <div className="item_info_like" data-aos="fade-right">
                          <i className="fa fa-heart"></i>
                          {nftInfo.likes}
                        </div>
                      </div>
                      <p data-aos="fade-right">
                        doloremque laudantium, totam rem aperiam, eaque ipsa
                        quae ab illo inventore veritatis et quasi architecto
                        beatae vitae dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6 data-aos="fade-right">Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp" data-aos="fade-right">
                              <Link to={`/author/${nftInfo.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftInfo.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info" data-aos="fade-right">
                              <Link to={`/author/${nftInfo.ownerId}`}>
                                {nftInfo.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6 data-aos="fade-right">Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp" data-aos="fade-right">
                              <Link to={`/author/${nftInfo.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftInfo.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info" data-aos="fade-right">
                              <Link to={`/author/${nftInfo.creatorId}`}>
                                {nftInfo.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6 data-aos="fade-right">Price</h6>
                        <div className="nft-item-price" data-aos="fade-right">
                          <img src={EthImage} alt="" />
                          <span>{nftInfo.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
