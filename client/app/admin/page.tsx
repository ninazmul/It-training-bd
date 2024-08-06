"use client";

import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/DashboardHero";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`Admin Dashboard - IT Training BD`}
          description="Elearning is a prlatform for student to learn and get help from teachers"
          keywords="Programming, MERN Stack, Redux, Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
