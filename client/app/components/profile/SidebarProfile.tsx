import React, { FC } from "react";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import defaultAvatar from "../../../public/Avatar.png";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full flex md:flex-col">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-[#ffd900] bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar}
          alt=""
          className="w-[20px] h-[20px] object-cover lg:w-[30px] lg:h-[30px] cursor-pointer rounded-full"
          width={20}
          height={20}
        />
        <h5
          className={`pl-2 lg:block hidden font-Poppins ${
            active === 1 ? "text-black" : "dark:text-white"
          }`}
        >
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-[#ffd900] bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          size={20}
          className={active === 2 ? "text-black" : "dark:text-white"}
        />
        <h5
          className={`pl-2 lg:block hidden font-Poppins ${
            active === 2 ? "text-black" : "dark:text-white"
          }`}
        >
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-[#ffd900] bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          size={20}
          className={active === 3 ? "text-black" : "dark:text-white"}
        />
        <h5
          className={`pl-2 lg:block hidden font-Poppins ${
            active === 3 ? "text-black" : "dark:text-white"
          }`}
        >
          Enrolled Courses
        </h5>
      </div>
      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"
          }`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className={active === 6 ? "text-black" : "dark:text-white"}
          />
          <h5
            className={`pl-2 lg:block hidden font-Poppins ${
              active === 6 ? "text-black" : "dark:text-white"
            }`}
          >
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer hover:bg-[crimson] ${
          active === 4 ? "dark:bg-[#ffd900] bg-gray-200" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout
          size={20}
          className={active === 4 ? "text-black" : "dark:text-white"}
        />
        <h5
          className={`pl-2 lg:block hidden font-Poppins ${
            active === 4 ? "text-black" : "dark:text-white"
          }`}
        >
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
