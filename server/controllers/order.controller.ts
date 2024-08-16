import { Response, Request, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { redis } from "../utils/redis";
import axios from "axios";

const SSL_COMMERZ_STORE_ID = process.env.SSL_COMMERZ_STORE_ID;
const SSL_COMMERZ_STORE_PASS = process.env.SSL_COMMERZ_STORE_PASS;

// Create Order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, payment_info } = req.body as IOrder;

    if (!payment_info || !courseId) {
      return next(
        new ErrorHandler("Missing course or payment information", 400)
      );
    }

    try {
      // Verify SSLCommerz payment
      const { transaction_id } = payment_info;
      const verificationResponse = await axios.post(
        "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
        null,
        {
          params: {
            val_id: transaction_id,
            store_id: SSL_COMMERZ_STORE_ID,
            store_passwd: SSL_COMMERZ_STORE_PASS,
            format: "json",
          },
        }
      );

      if (verificationResponse?.data?.status !== "VALID") {
        return next(new ErrorHandler("Payment not authorized!", 400));
      }

      // Payment verified, proceed with order creation
      const user = await userModel.findById(req.user?._id);
      const course = await CourseModel.findById(courseId);

      if (!user || !course) {
        return next(new ErrorHandler("User or Course not found!", 404));
      }

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course!", 400)
        );
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course.id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?.id);

      await redis.set(req.user?._id as string, JSON.stringify(user));

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      if (course.purchased) {
        course.purchased += 1;
      } else {
        course.purchased = 1;
      }

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get All Orders -- Only for Admin
export const getAllOrdersForAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// New Payment using SSLCommerz
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { amount, courseId } = req.body;

    if (!amount || !courseId || typeof amount !== "number") {
      return next(new ErrorHandler("Invalid amount or course ID", 400));
    }

    try {
      // Prepare payment data for SSLCommerz
      const paymentData = {
        store_id: SSL_COMMERZ_STORE_ID,
        store_passwd: SSL_COMMERZ_STORE_PASS,
        total_amount: amount,
        currency: "BDT",
        tran_id: new Date().getTime().toString(),
        success_url: "http://localhost:3000/success",
        fail_url: "http://localhost:3000/fail",
        cancel_url: "http://localhost:3000/cancel",
        value_a: courseId, // Pass courseId for later use
      };

      // Send request to SSLCommerz
      const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
        paymentData
      );

      // Check if payment URL is in the response
      if (!response.data.GatewayPageURL) {
        return next(new ErrorHandler("Payment URL not found!", 500));
      }

      res.status(200).json({
        success: true,
        payment_url: response.data.GatewayPageURL,
      });
    } catch (error: any) {
      console.error("Payment Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
