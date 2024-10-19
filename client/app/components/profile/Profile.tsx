"use client";
import React, { FC, useEffect, useState } from "react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ChangePassword from "./ChangePassword";
import SideBarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  const {} = useLogoutQuery(undefined, {
    skip: !logout,
  });

  const [active, setActive] = useState(1);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY > 85) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  return (
    <div className="flex flex-col md:flex-row w-[85%] mx-auto text-black dark:text-white">
      <div
        className={`w-full md:w-[60px] 800px:w-[310px] rounded-md shadow-xl border-b border-[#ffd900] backdrop-blur-lg bg-opacity-40 mt-4 md:mt-[80px] md:mb-[80px] md:sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      <div className="w-full h-full bg-transparent mt-[80px] md:mt-4 md:ml-4">
        {active === 1 && <ProfileInfo avatar={avatar} user={user} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>
        )}
        {active === 3 && courses?.length === 0 && (
          <h1 className="text-center text-[18px] font-Poppins mt-8">
            You don't have any purchased courses!
          </h1>
        )}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Profile;
