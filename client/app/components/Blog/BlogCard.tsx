import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type BlogImage = {
  public_id: string;
  url: string;
  _id: string;
};

type Blog = {
  _id: string;
  blog: {
    image: BlogImage;
    title: string;
    description: string;
  };
};

type Props = {
  item: Blog; // The blog object being passed
};

const BlogCard: FC<Props> = ({ item }) => {
  return (
    <Link href={`/blog/${item._id}`}>
      <div className="w-full h-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#0000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        {item.blog.image ? ( // Accessing the blog property
          <Image
            src={item.blog.image.url} // Accessing the image property
            width={500}
            height={300}
            objectFit="contain"
            className="h-52 rounded w-full"
            alt={item.blog.title} // Accessing the title property
          />
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 rounded">
            <p className="text-gray-500">No image available</p>
          </div>
        )}
        <h1 className="font-serif text-[16px] text-black dark:text-[#fff] line-clamp-1 mt-2 text-xl font-bold">
          {item.blog.title}
        </h1>
        <p className="text-black dark:text-[#fff] line-clamp-3 mt-1 text-justify text-sm">
          {item.blog.description}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
