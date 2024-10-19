"use client";

import BlogDetailsPage from "@/app/components/Blog/BlogDetailsPage";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;
  return <BlogDetailsPage id={id} />;
};

export default page;
