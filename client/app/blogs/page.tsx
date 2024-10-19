"use client";

import React, { useEffect, useState } from "react";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/styles";
import Footer from "../components/Footer";
import Loader from "../components/Loader/Loader";
import BlogCard from "../components/Blog/BlogCard";

// Define the type for a blog image
type BlogImage = {
  public_id: string;
  url: string;
  _id: string;
};

// Update the Blog interface to match the data structure
interface Blog {
  _id: string;
  blog: {
    title: string;
    description: string;
    image: BlogImage;
  };
}

const Page = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery(undefined, {});

  // Use the Blog type for the blogs array
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (data?.blogs) {
      setBlogs(data.blogs);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className={`${styles.label} text-center`}>
          There was an error fetching blogs. Please try again later.
        </p>
      ) : (
        <>
          <Header
            activeItem={1}
            open={false}
            setOpen={() => {}}
            route={""}
            setRoute={() => {}}
          />
          <div className="w-[96%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="All Blogs - IT Training BD"
              description="Explore our latest blogs on programming and technology."
              keywords="Blogs, programming, technology, IT Training"
            />
            <br />
            {blogs.length === 0 ? (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                No blogs available at this moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                {blogs.map((item) => (
                  <BlogCard item={item} key={item._id} />
                ))}
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
