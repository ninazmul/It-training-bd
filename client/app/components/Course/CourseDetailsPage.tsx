"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import { useCreatePaymentMutation } from "@/redux/features/orders/orderApi";
import Loader from "../Loader/Loader";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const [createPayment, { data: paymentResponse }] = useCreatePaymentMutation();
  const [paymentUrl, setPaymentUrl] = useState("");

  useEffect(() => {
    if (data) {
      const amount = Math.round(data.course.price); // SSLCommerz expects the amount in integer
      createPayment({ amount });
    }
  }, [data]);

  useEffect(() => {
    if (paymentResponse?.payment_url) {
      setPaymentUrl(paymentResponse.payment_url);
      // Redirect to the payment URL
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    }
  }, [paymentResponse, paymentUrl]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Heading
              title={data.course.name + " - IT Training BD"}
              description="LMS is a platform for students to learn and get help from teachers"
              keywords={data.course.tags}
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
