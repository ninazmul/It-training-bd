"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from "@/redux/features/orders/orderApi";
import Loader from "../Loader/Loader";
import CourseDetails from "./CourseDetails";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

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
            {/* {stripePromise && (
              <CourseDetails
                data={data?.course}
                stripePromise={stripePromise}
                clientSecret={clientSecret}
                setOpen={setOpen}
                setRoute={setRoute}
              />
            )} */}
            <CourseDetails
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
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
