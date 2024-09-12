import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import defaultImage from "../../../public/lms.png";
import { VscVerifiedFilled } from "react-icons/vsc";
import ContentCourseList from "./ContentCourseList";
import CheckOutForm from "../Payment/CheckOutForm";
import { useGetOrdersWithMinimalInfoQuery } from "@/redux/features/orders/orderApi";

type Props = {
  data: any;
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const CourseDetails = ({ data, setRoute, setOpen: openAuthModal }: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const { data: ordersData } = useGetOrdersWithMinimalInfoQuery(undefined, {});

  useEffect(() => {
    if (userData?.success && userData?.data) {
      setUser(userData.data);
    }
  }, [userData]);

  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const courseExistInUser = user?.courses.some(
    (course: any) => course._id === data?._id
  );

  const courses = userData?.data.courses;
  let courseId = null;
  if (courses && courses.length > 0) {
    courseId = courses[0]._id;
  } else {
    console.log("No courses available.");
  }

  const orderForCourse = ordersData?.orders?.find((order: any) =>
    order.items.some((item: any) => item.productId === data._id)
  );

  const isCoursePaid = orderForCourse?.isPaid;
  const isOrderAvailable = !!orderForCourse;

  useEffect(() => {
  if (isOrderAvailable && !isCoursePaid) {
    setShowApprovalModal(true);
  }
}, [isOrderAvailable, isCoursePaid]);

  return (
    <div className="w-full px-4 py-5">
      <div className="w-full max-w-screen-xl mx-auto py-5">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Left Section */}
          <div className="w-full lg:w-[65%] lg:pr-12">
            <h1 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="ml-2 text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>

            <h2 className="mt-5 text-xl lg:text-2xl font-semibold text-black dark:text-white">
              What you will learn from this course?
            </h2>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className="flex items-center py-2" key={index}>
                  <IoMdCheckmarkCircleOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-5 text-xl lg:text-2xl font-semibold text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h2>
            <div>
              {data.prerequisites?.map((item: any, index: number) => (
                <div className="flex items-center py-2" key={index}>
                  <IoMdCheckmarkCircleOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-5 text-xl lg:text-2xl font-semibold text-black dark:text-white">
              Course Overview
            </h2>
            <ContentCourseList data={data?.courseData} isDemo={true} />

            <div className="mt-5">
              <h2 className="text-xl lg:text-2xl font-semibold text-black dark:text-white">
                Course Details
              </h2>
              <p className="mt-3 text-lg text-black dark:text-white">
                {data.description}
              </p>
            </div>

            <div className="mt-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center my-4">
                <Ratings rating={data?.ratings} />
                <h5 className="mt-2 sm:mt-0 sm:ml-3 text-xl font-semibold text-black dark:text-white">
                  {data?.ratings.toFixed(1)} Course Rating *{" "}
                  {data?.reviews?.length} Reviews
                </h5>
              </div>

              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : defaultImage
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          <Ratings rating={item.rating} />
                        </h5>
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              i.user.avatar ? i.user.avatar.url : defaultImage
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>
                            {i.user.role === "admin" && (
                              <VscVerifiedFilled className="text-[#0095f6] ml-2 text-[20px]" />
                            )}
                          </div>
                          <p>{i.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-[35%] mt-10 lg:mt-0 relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex gap-2 items-center mt-5">
                <h1 className="text-2xl text-black dark:text-white">
                  {data.price === 0
                    ? "Free"
                    : `${data.estimatedPrice || data.price}৳`}
                </h1>
                <h5 className="mt-2 sm:mt-0 sm:ml-3 text-xl line-through text-gray-500">
                  {data.price}৳
                </h5>
                <h4 className="mt-2 sm:mt-0 sm:ml-5 text-xl text-red-600">
                  {discountPercentagePrice}% Off
                </h4>
              </div>

              <div className="mt-5">
                {courseExistInUser ? (
                  isCoursePaid ? (
                    <Link
                      className="block w-full text-center py-3 px-4 bg-[#ffd900] text-black font-medium rounded-lg"
                      href={`/course-access/${data._id}`}
                    >
                      Enter Course
                    </Link>
                  ) : (
                    <button className="block w-full text-center py-3 px-4 bg-red-500 text-white font-medium rounded-lg">
                      Waiting for Approval
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleOrder}
                    className="block w-full text-center py-3 px-4 bg-green-600 text-white font-medium rounded-lg"
                  >
                    {isOrderAvailable ? "Order Now" : "Enroll Now"}
                  </button>
                )}
              </div>

              <div className="mt-5 text-lg text-black dark:text-white">
                <p>* Source code included</p>
                <p>* Full lifetime access</p>
                <p>* Certificate of completion</p>
                <p>* Premium Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        {showApprovalModal && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[400px] min-h-[200px] dark:border-[#ffffff1c] bg-white shadow-xl rounded-xl p-5">
              <div className="w-full flex justify-end">
                <IoMdCloseCircleOutline
                  size={30}
                  className="text-black cursor-pointer"
                  onClick={() => setShowApprovalModal(false)}
                />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold text-black">
                  Waiting for Approval
                </h2>
                <p className="mt-3 text-black">
                  Your course is waiting for approval. Admin will approve it
                  after reviewing all necessary details.
                </p>
                <button
                  className="mt-5 px-4 py-2 bg-[#ffd900] text-black rounded-lg"
                  onClick={() => setShowApprovalModal(false)}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}

        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[420px] dark:border-[#ffffff1c] bg-white shadow-xl rounded-xl p-3">
              <div className="w-full flex justify-end">
                <IoMdCloseCircleOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                <CheckOutForm setOpen={setOpen} data={data} user={user} />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
