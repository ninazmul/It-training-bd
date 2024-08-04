"use client";

import AllCourses from "@/app/components/Admin/course/AllCourses";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

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
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
