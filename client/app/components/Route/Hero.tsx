"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";

type Props = {};

const Hero: FC<Props> = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search) {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center text-black dark:text-white py-10 lg:py-20 px-5">
      <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start z-10 text-center lg:text-left p-4">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
          Transform Your Learning Experience
        </h1>
        <p className="text-lg lg:text-xl font-medium mb-6">
          Access over 40k online courses and join 500k+ students in enhancing
          your skills.
        </p>
        <div className="relative w-full max-w-md flex items-center">
          <input
            type="text"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-12 px-4 text-gray-800 rounded-l-md outline-none"
          />
          <button
            className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 transition-colors rounded-r-md"
            onClick={handleSearch}
            aria-label="Search"
          >
            <BiSearch className="text-white" size={24} />
          </button>
        </div>
      </div>

      <div className="absolute hero_animation rounded-full bottom-[5%] w-[300px] md:w-4/5 h-[300px] md:h-2/3 lg:w-1/3 lg:h-4/5 lg:right-[15%]"></div>
      <div className="w-full lg:w-[40%] flex items-center justify-end pt-[70px] lg:pt-0 z-10">
        <div className="relative flex items-center justify-end w-full">
          <Image
            src={require("/public/IT hero.png")}
            alt="Hero Image"
            className="object-contain w-4/5 h-auto z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
