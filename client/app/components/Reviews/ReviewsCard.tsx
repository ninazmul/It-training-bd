import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";
import Avatar from "../../../public/Avatar.png";

type Props = {
  item: any;
};

const ReviewsCard = (props: Props) => {
  return (
    <div className="w-full h-full pb-4 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#0000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
      <div className="flex w-full items-start">
        <Image
          src={props.item.avatar || Avatar}
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
          alt={props.item.name}
        />
        <div className="flex-1 pl-4">
          <h5 className="text-[20px] text-black dark:text-white">
            {props.item.name}
          </h5>
          <Ratings rating={props.item.rating} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-black dark:text-white text-justify">
        {props.item.comment}
      </p>
    </div>
  );
};

export default ReviewsCard;
