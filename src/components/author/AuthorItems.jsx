/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../UI/SkeletonCard";

const AuthorItems__API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=`;

const AuthorItems = () => {
  const { authorId } = useParams();
  const [nftInfo, setNftInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const skeletonArray = Array(8).fill(null);

  async function fetchUserInfo() {
    try {
      const response = await axios.get(`${AuthorItems__API}${authorId}`);
      // Seperated the nft data from the user and shortened names
      const apiUserData = {
        authorName: response.data.authorName,
        address: response.data.address,
        authorImage: response.data.authorImage,
        followers: response.data.followers,
        id: response.data.id,
        tag: response.data.tag,
      };
      // Seperated the data objects
      setUserInfo(apiUserData);
      setNftInfo(response.data.nftCollection);
    } catch (error) {
      console.error("Failed to Fetch Data", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading && (
            <>
              {skeletonArray.map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <SkeletonCard index={index} />
                </div>
              ))}
            </>
          )}
          {!isLoading && (
            <>
              {Object.values(nftInfo).map((nft, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img
                          className="lazy"
                          src={userInfo.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
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
                      <Link to="/item-details">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
