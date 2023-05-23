/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import SkeletonCard from "../UI/SkeletonCard";
import "aos/dist/aos.css";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ user, isLoading }) => {
  const skeletonArray = Array(8).fill(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!isLoading ? (
            user.nftCollection.map((nft, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <NftCard
                  user={user}
                  nft={{
                    ...nft,
                    authorImage: nft.authorImage,
                    authorId: nft.authorId,
                  }}
                />
              </div>
            ))
          ) : (
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
