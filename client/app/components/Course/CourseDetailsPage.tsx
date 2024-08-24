"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../Loader/Loader";
import CourseDetails from "./CourseDetails";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const [createOrder, { data: orderResponse, isLoading: isOrderLoading }] =
    useCreateOrderMutation();
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    if (data) {
      createOrder({
        courseId: data.course._id,
        payment_info: {
          name: "User Name", // Adjust this as needed
          email: "user@example.com", // Adjust this as needed
          phone: "1234567890", // Adjust this as needed
          transactionId: "",
        },
      });
    }
  }, [data, createOrder]);

  useEffect(() => {
    if (orderResponse?.payment_url) {
      setPaymentUrl(orderResponse.payment_url);
      // Redirect to the payment URL
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    }
  }, [orderResponse, paymentUrl]);

  return (
    <>
      {isLoading || isOrderLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Heading
              title={data?.course.name + " - IT Training BD"}
              description="LMS is a platform for students to learn and get help from teachers"
              keywords={data?.course.tags || []}
            />
            <Header
              open={open}
              setOpen={setOpen}
              activeItem={1}
              setRoute={setRoute}
              route={route}
            />
            <CourseDetails
              data={data?.course}
              setOpen={setOpen}
              setRoute={setRoute}
            />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
