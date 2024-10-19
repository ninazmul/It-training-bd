import React, { useEffect, useState } from "react";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import BlogCard from "../Blog/BlogCard";

type Props = {};

const Blogs = (props: Props) => {
  const { data, isLoading } = useGetAllBlogsQuery({});
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    setBlogs(data?.blogs || []);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-light">
          Get the latest insights on our{" "}
          <span className="text-[#ffd900]">Blogs</span> <br />
          to boost your career.
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {blogs.map((item) => (
            <BlogCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
