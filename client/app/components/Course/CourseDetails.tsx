import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import defaultImage from "../../../public/lms.png";
import { VscVerifiedFilled } from "react-icons/vsc";
import ContentCourseList from "./ContentCourseList";
import { useCreatePaymentMutation } from "@/redux/features/orders/orderApi";
import { redirect } from "next/navigation";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const CourseDetails = ({ data, setRoute, setOpen: openAuthModal }: Props) => {
  const [createPayment] = useCreatePaymentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (userData?.success && userData?.data) {
      setUser(userData.data);
    }
  }, [userData]);

  const handleOrder = async () => {
    if (user) {
      try {
        const paymentResponse = await createPayment({
          amount: data.estimatedPrice || data.price,
          courseId: data._id,
        }).unwrap();

        if (paymentResponse?.payment_url) {
          window.location.href = paymentResponse.payment_url;
        } else if (paymentResponse?.success) {
          socket.emit("notification", {
            title: "New Order",
            message: `You have a new order from ${data.name}`,
            userId: user._id,
          });
          // Redirect to course access page after successful payment
          redirect(`/course-access/${data._id}`);
        }
      } catch (error) {
        console.error("Payment error:", error);
      }
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="mt-2 sm:mt-0 sm:ml-3 text-xl font-semibold text-black dark:text-white">
                  {data?.ratings.toFixed(1)} Course Rating *{" "}
                  {data?.reviews?.length} Reviews
                </h5>
              </div>

              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="mt-5" key={index}>
                    <div className="flex items-center">
                      <Image
                        src={
                          item.user.avatar ? item.user.avatar.url : defaultImage
                        }
                        width={50}
                        height={50}
                        alt=""
                        className="rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h5 className="text-lg font-medium text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                        <p className="mt-2 text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-gray-600 dark:text-gray-400">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>

                    {item.commentReplies.map((reply: any, index: number) => (
                      <div className="flex mt-5 pl-12" key={index}>
                        <Image
                          src={
                            reply.user.avatar
                              ? reply.user.avatar.url
                              : defaultImage
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h5 className="text-lg font-medium text-black dark:text-white">
                              {reply.user.name}
                            </h5>
                            {reply.user.role === "admin" && (
                              <VscVerifiedFilled className="text-blue-500 ml-2" />
                            )}
                          </div>
                          <p className="mt-1 text-black dark:text-white">
                            {reply.comment}
                          </p>
                          <small className="text-gray-600 dark:text-gray-400">
                            {format(reply.createdAt)}
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
                    : `${data.estimatedPrice || data.price}$`}
                </h1>
                <h5 className="mt-2 sm:mt-0 sm:ml-3 text-xl line-through text-gray-500">
                  {data.price}$
                </h5>
                <h4 className="mt-2 sm:mt-0 sm:ml-5 text-xl text-red-600">
                  {discountPercentagePrice}% Off
                </h4>
              </div>

              <div className="mt-5">
                {courseExistInUser ? (
                  <Link
                    className="block w-full text-center py-3 px-6 bg-blue-600 text-white rounded-lg"
                    href={`/course-access/${data._id}`}
                  >
                    Enter Course
                  </Link>
                ) : (
                  <button
                    className="block w-full text-center py-3 px-6 bg-red-600 text-white rounded-lg"
                    onClick={handleOrder}
                  >
                    Buy Now
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
    </div>
  );
};

export default CourseDetails;
