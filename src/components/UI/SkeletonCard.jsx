import React from "react";
import Skeleton from "./Skeleton";

function SkeletonCard({ index }) {
  return (
    <>
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
            <Skeleton width={225} height={225} />
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
              <Skeleton width={16} height={16} />
              <Skeleton width={16} height={16} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonCard;
