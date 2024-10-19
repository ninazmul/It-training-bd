"use client";

import CreateBlog from "@/app/components/Admin/blogs/CreateBlog";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
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
          description="Create and manage blogs for your platform"
          keywords="Blogging, Admin, Content Management"
        />
        <div className="flex h-full">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <CreateBlog />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
