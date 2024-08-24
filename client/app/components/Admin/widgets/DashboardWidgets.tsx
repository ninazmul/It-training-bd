import React, { FC, useEffect, useState } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  useGetOrdersAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import UserAnalytics from "../analytics/UsersAnalytics";
import OrdersAnalytics from "../analytics/OrdersAnalytics";
import AllInvoices from "../orders/AllInvoices";
import Loader from "../../Loader/Loader";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={50}
        color={value && value > 99 ? "info" : "error"}
        thickness={5}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [orderComparePercentage, setOrderComparePercentage] =
    useState<any>(null);
  const [userComparePercentage, setUserComparePercentage] = useState<any>(null);

  const { data, isLoading, error } = useGetUserAnalyticsQuery({});
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (!isLoading && !ordersLoading && data && ordersData) {
      const usersLastTwoMonths = data.users.Last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.Last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          ((usersCurrentMonth - usersPreviousMonth) /
            (usersPreviousMonth === 0 ? 1 : usersPreviousMonth)) *
          100;
        const ordersPercentChange =
          ((ordersCurrentMonth - ordersPreviousMonth) /
            (ordersPreviousMonth === 0 ? 1 : ordersPreviousMonth)) *
          100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });
        setOrderComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  if (isLoading || ordersLoading) {
    return <Loader />;
  }

  if (error || ordersError) {
    return <Typography color="error">Failed to load data</Typography>;
  }

  return (
    <div className="min-h-screen px-6 lg:px-12 pt-10 lg:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111c43] rounded-lg shadow p-6 flex items-center justify-between">
          <div>
            <BiBorderLeft className="text-3xl text-[#ffd900]" />
            <h5 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">
              {orderComparePercentage?.currentMonth || 0}
            </h5>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
              Sales Obtained
            </p>
          </div>
          <div className="flex items-center">
            <CircularProgressWithLabel
              value={orderComparePercentage?.percentChange > 0 ? 100 : 0}
              open={open}
            />
            <p className="ml-4 text-xl font-medium text-gray-900 dark:text-white">
              {orderComparePercentage?.percentChange
                ? `${
                    orderComparePercentage?.percentChange > 0 ? "+" : "-"
                  }${orderComparePercentage?.percentChange.toFixed(2)}%`
                : "0%"}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111c43] rounded-lg shadow p-6 flex items-center justify-between">
          <div>
            <PiUsersFourLight className="text-3xl text-[#ffd900]" />
            <h5 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">
              {userComparePercentage?.currentMonth || 0}
            </h5>
            <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
              New Users
            </p>
          </div>
          <div className="flex items-center">
            <CircularProgressWithLabel
              value={userComparePercentage?.percentChange > 0 ? 100 : 0}
              open={open}
            />
            <p className="ml-4 text-xl font-medium text-gray-900 dark:text-white">
              {userComparePercentage?.percentChange
                ? `${
                    userComparePercentage?.percentChange > 0 ? "+" : "-"
                  }${userComparePercentage?.percentChange.toFixed(2)}%`
                : "0%"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-12 grid grid-cols-1 gap-10">
        <UserAnalytics isDashboard={true} />
        <div className="space-y-8">
          <OrdersAnalytics isDashboard={true} />
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
