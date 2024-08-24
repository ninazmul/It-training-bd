import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../public/IT logo.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-100 dark:bg-gradient-to-b dark:from-[#0d0141] dark:to-[#0d0523] py-8">
      <div className="w-[95%] max-w-[1200px] mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="space-y-4 col-span-2 my-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-3xl md:text-4xl font-semibold text-black dark:text-white">
                IT Training BD
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Leading platform for online courses, empowering you to achieve
              your goals.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://youtube.com"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  className="text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 IT Training BD | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
