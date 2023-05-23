import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import "aos/dist/aos.css";

const Author__API = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=`;

const Author = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  // const [nftInfo, setNftInfo] = useState({});
  // brought over the authorId to get data
  const { authorId } = useParams();
  // checking following status for follow button
  const [isFollowing, setIsFollowing] = useState(false);

  async function renderUserData() {
    try {
      const { data } = await axios.get(`${Author__API}${authorId}`);
      setUserInfo(data);
      // setNftInfo(data.nftCollection);
      console.log(data);
    } catch (error) {
      console.error("Failed to Fetch Data", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    renderUserData();
  }, []);

  // Follower button functionality
  function addFollower() {
    let followers = userInfo.followers;
    if (isFollowing === false) {
      userInfo.followers = followers + 1;
      setIsFollowing(true);
    }
    if (isFollowing === true) {
      userInfo.followers = followers - 1;
      setIsFollowing(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <div>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width={150}
                            height={150}
                            borderRadius={99}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <span className="profile_username">
                                <Skeleton width={200} height={30} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width={75} height={22} />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width={100} height={24} />
                          </div>
                          <Skeleton width={125} height={35} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={userInfo.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <p>{userInfo.authorName}</p>
                              <p className="profile_username">
                                @{userInfo.tag}
                              </p>
                              <p id="wallet" className="profile_wallet">
                                {userInfo.address}
                              </p>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {userInfo.followers} followers
                          </div>
                          <Link
                            to="#"
                            onClick={addFollower}
                            className="btn-main"
                          >
                            {isFollowing ? "Unfollow" : "Follow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems user={userInfo} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
