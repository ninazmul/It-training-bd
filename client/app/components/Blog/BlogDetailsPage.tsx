"use client";

import React from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import Loader from "../Loader/Loader";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";

type Props = {
  id: string;
};

const BlogDetailsPage = ({ id }: Props) => {
  const { data, isLoading } = useGetSingleBlogQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen text-black dark:text-white">
          <Heading
            title={`${data?.blog.blog.title} - IT Training BD`}
            description={
              data?.blog.blog.description ||
              "Read the latest insights on our blog."
            }
            keywords={data?.blog.blog.tags || []}
          />
          <Header
            activeItem={1}
            open={false}
            setOpen={() => {}}
            route={""}
            setRoute={() => {}}
          />
          <main className="m-auto w-[96%] max-w-4xl p-6 flex-grow">
            <img
              src={data?.blog.blog.image.url}
              alt={data?.blog.blog.title}
              className="w-full rounded-lg object-cover mb-6 shadow-md border-[#ffd900] border-2 p-1"
            />
            <h1 className="text-3xl font-bold text-center mb-4">
              {data?.blog.blog.title}
            </h1>
            <div className="leading-relaxed text-justify">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.blog.blog.description,
                }}
              />
            </div>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BlogDetailsPage;
