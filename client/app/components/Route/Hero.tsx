"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";

type Props = {};

const Hero: FC<Props> = () => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, isLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url || null);
    }
  }, [data]);

  const handleSearch = () => {
    if (search.trim() === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative w-full flex flex-col lg:flex-row items-center text-black dark:text-white py-10 lg:py-20 px-5">
          <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left p-4 space-y-6 lg:space-y-8 z-10">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-lg lg:text-xl font-medium">{subTitle}</p>
            <div className="relative w-full max-w-md flex items-center">
              <input
                type="search"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 h-12 px-4 text-gray-800 dark:text-white rounded-l-md outline-none"
              />
              <button
                className="flex items-center justify-center w-12 h-12 bg-yellow-400 hover:bg-yellow-500 transition-colors rounded-r-md"
                onClick={handleSearch}
                aria-label="Search"
              >
                <BiSearch className="text-black" size={24} />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center pt-10 lg:pt-0">
            {image ? (
              <Image
                src={image}
                width={500}
                height={500}
                alt="Hero Image"
                className="object-cover w-full max-w-sm h-auto rounded-md"
              />
            ) : (
              <div className="w-full max-w-sm h-[350px] flex items-center justify-center text-gray-600">
                No Image Available
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
