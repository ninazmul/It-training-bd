"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface PageProps {}

const Page: FC<PageProps> = (PageProps) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading
        title="IT Training BD"
        description="IT Training BD is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning, Course"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero/>
    </div>
  );
};

export default Page;
