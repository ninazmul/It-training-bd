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
    try {
      const { courseId, payment_info } = req.body as IOrder;

      // Verify SSLCommerz payment
      if (payment_info) {
        const { transaction_id } = payment_info;

        // Verify payment status using SSLCommerz API
        const verificationResponse = await axios
          .post(
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
          )
          .catch(() => {
            return next(new ErrorHandler("Error verifying payment!", 500));
          });

        if (verificationResponse?.data?.status !== "VALID") {
          return next(new ErrorHandler("Payment not authorized!", 400));
        }
      }

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course!", 400)
        );
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found!", 500));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
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
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return next(new ErrorHandler("Invalid amount", 400));
    }

    try {
      // Prepare payment data for SSLCommerz
      const paymentData = {
        store_id: SSL_COMMERZ_STORE_ID,
        store_passwd: SSL_COMMERZ_STORE_PASS,
        total_amount: amount,
        currency: "BDT", // Adjust based on your currency
        tran_id: new Date().getTime().toString(),
        success_url: "http://yourdomain.com/success",
        fail_url: "http://yourdomain.com/fail",
        cancel_url: "http://yourdomain.com/cancel",
      };

      // Send request to SSLCommerz
      const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData
      );

      res.status(200).json({
        success: true,
        payment_url: response.data.GatewayPageURL,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);