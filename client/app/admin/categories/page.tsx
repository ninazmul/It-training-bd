"use client";

import EditCategories from "@/app/components/Admin/customization/EditCategories";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <Heading
        title="IT Training BD - Admin"
        description="LMS is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-min-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <EditCategories />
        </div>
      </div>
    </div>
  );
};

export default Page;
