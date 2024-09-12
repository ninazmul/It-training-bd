import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import socketIO from "socket.io-client";
import toast from "react-hot-toast";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type FormData = {
  name: string;
  email: string;
  phone: string;
  transactionId: string;
  courseId: string;
};

type Props = {
  setOpen: (open: boolean) => void;
  data: {
    _id: string;
    courseId: string;
    estimatedPrice?: number;
    price: number;
  };
  user: {
    name: string;
    email: string;
    _id: string;
    courses: { _id: string }[];
  };
};

const CheckOutForm: React.FC<Props> = ({ setOpen, data, user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      transactionId: "",
      courseId: data?.courseId || "",
    },
  });

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    const alreadyEnrolled = user.courses.some(
      (course) => course._id === data?.courseId
    );

    if (alreadyEnrolled) {
      toast.error("You are already enrolled in this course.");
    }
  }, [user.courses, data?.courseId]);

  const onSubmit = async (formData: FormData) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await createOrder({
        courseId: data._id,
        payment_info: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          transactionId: formData.transactionId,
        },
      }).unwrap();

      if (!response.success) {
        throw new Error("Failed to submit order");
      }

      socket.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${formData.name}`,
        userId: user._id,
      });

      toast.success("Order submitted successfully!");
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Order Submission Error:", error);
      toast.error("An error occurred: " + (error as Error).message);
    }
  };

  return (
    <div className="my-4 rounded-lg shadow-lg max-w-md mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">
          {data.estimatedPrice ? (
            <>
              <span className="text-green-600">Estimated Price: </span>
              <span>{data.estimatedPrice}৳</span>
            </>
          ) : (
            <>
              <span className="text-red-600">Price: </span>
              <span>{data.price}৳</span>
            </>
          )}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">
            Name
            <input
              {...register("name", { required: true })}
              className={`mt-1 block w-full text-black dark:text-white p-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </label>
        </div>
        <div>
          <label className="block font-medium mb-2">
            Email
            <input
              type="email"
              {...register("email", { required: true })}
              className={`mt-1 block w-full text-black dark:text-white p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </label>
        </div>
        <div>
          <label className="block font-medium mb-2">
            Phone
            <input
              type="tel"
              {...register("phone", { required: true })}
              className={`mt-1 block w-full text-black dark:text-white p-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">Phone number is required</p>
            )}
          </label>
        </div>
        <div>
          <p className="text-md font-semibold mb-2 text-gray-700">
            Please send money to this Bkash account:{" "}
            <span className="font-bold text-black">+8801630211216</span>
          </p>
          <label className="block font-medium mb-2">
            Transaction ID
            <input
              {...register("transactionId", { required: true })}
              className={`mt-1 block w-full text-black dark:text-white p-2 border ${
                errors.transactionId ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter the transaction ID"
            />
            {errors.transactionId && (
              <p className="text-red-500 text-sm">Transaction ID is required</p>
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading || isSubmitted}
          className="w-full py-2 px-4 bg-[#ffd900] text-black font-semibold rounded-md hover:bg-[#ffae00] transition duration-200"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
