"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/profile/Profile";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  if (isLoading) {
    return <Loader />;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${userData?.name}'s profile - IT Training BD`}
          description="IT Training BD is a platform for students to learn and get help from teachers."
          keywords="Programming, MERN Stack, Redux, Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={userData} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
