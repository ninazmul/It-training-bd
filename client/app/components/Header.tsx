import Link from "next/link";
import React, { FC, useEffect, useState, useCallback } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import Image from "next/image";
import Avatar from "../../public/Avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import logo from "../../public/IT logo.png";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const {
      data: userData,
      isLoading,
      refetch,
    } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
    const [logout, setLogout] = useState(false);
    const {} = useLogoutQuery(undefined, {
      skip: !logout ? true : false,
    });

    useEffect(() => {
      if (!isLoading) {
        if (!userData) {
          if (data) {
            socialAuth({
              email: data?.user?.email,
              name: data?.user?.name,
              avatar: data?.user?.image,
            });
            refetch();
          }
        }
        if (data === null) {
          if (isSuccess) {
            toast.success("Login successfully");
          }
        }
        if (data === null && !isLoading && !userData) {
          setLogout(true);
        }
      }
    }, [data, userData, isLoading]);

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
    }

    const handleClose = (e: any) => {
      if (e.target.id === "screen") {
        setOpenSidebar(false);
      }
    };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] backdrop-blur-lg bg-opacity-75 shadow-xl transition duration-500"
            : "w-full h-[80px] z-[80] shadow-xl border-b dark:border-[#ffffff1c] backdrop-blur-lg bg-opacity-40"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="flex items-center justify-between p-3 h-[80px]">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl md:text-[25px] font-Poopins font-[500] text-black dark:text-white"
            >
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="w-8 h-8"
              />
              IT Training BD
            </Link>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {userData ? (
                <Link href="/profile">
                  <Image
                    src={userData.data?.avatar?.url || Avatar}
                    width={30}
                    height={30}
                    alt="User Avatar"
                    className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer"
                    style={{
                      border: activeItem === 5 ? "2px solid #ffd900" : "none",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <div className="800px:hidden ml-4">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
          onClick={handleClose}
          id="screen"
        >
          <div className="fixed z-[9999999999] w-[69%] h-screen top-0 right-0 bg-white dark:bg-gradient-to-b dark:from-[#0d0141] dark:to-[#0d0523] dark:bg-opacity-90">
            <NavItems activeItem={activeItem} isMobile={true} />
            <p className="text-[16px] px-2 pl-5 text-black dark:text-white mt-5">
              &copy; {new Date().getFullYear()} IT Training BD. All rights
              reserved.
            </p>
          </div>
        </div>
      )}
      {open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={
            route === "Login"
              ? Login
              : route === "Sign-Up"
              ? SignUp
              : Verification
          }
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Header;
